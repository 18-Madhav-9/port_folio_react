const axios = require("axios");

const BASE_URL = "https://www.codechef.com/users";

function normalizeDate(input) {
  if (!input) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;

  if (/^\d{10,13}$/.test(input)) {
    const ts = Number(input);
    const ms = ts > 1e11 ? ts : ts * 1000;
    return new Date(ms).toISOString().split("T")[0];
  }

  return null;
}

function safeInt(value, fallback = 0) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseCodeChefHeatmap(html) {
  const heatmap = {};

  const regexForward =
    /["']?date["']?\s*:\s*["']?(\d{4}-\d{2}-\d{2}|\d{10,13})["']?[^}]*?["']?(?:count|value|submissions)["']?\s*:\s*(\d+)/gi;

  let match;
  while ((match = regexForward.exec(html)) !== null) {
    const dateStr = normalizeDate(match[1]);
    if (!dateStr) continue;
    heatmap[dateStr] = (heatmap[dateStr] || 0) + safeInt(match[2]);
  }

  const regexBackward =
    /["']?(?:count|value|submissions)["']?\s*:\s*(\d+)[^}]*?["']?date["']?\s*:\s*["']?(\d{4}-\d{2}-\d{2}|\d{10,13})["']?/gi;

  while ((match = regexBackward.exec(html)) !== null) {
    const dateStr = normalizeDate(match[2]);
    if (!dateStr) continue;
    heatmap[dateStr] = (heatmap[dateStr] || 0) + safeInt(match[1]);
  }

  const jsonMatch = html.match(/heatMapData\s*=\s*(\[[\s\S]*?\]);/);
  if (jsonMatch) {
    try {
      const heatMapArray = JSON.parse(jsonMatch[1]);

      heatMapArray.forEach((item) => {
        if (Array.isArray(item) && item.length >= 2) {
          const dateStr = normalizeDate(String(item[0]));
          const count = safeInt(item[1]);
          if (dateStr && count > 0) {
            heatmap[dateStr] = (heatmap[dateStr] || 0) + count;
          }
          return;
        }

        if (item && typeof item === "object") {
          const count = item.count !== undefined ? safeInt(item.count) : safeInt(item.value);
          const dateStr = normalizeDate(
            typeof item.date === "number" ? String(item.date) : item.date
          );

          if (dateStr && count > 0) {
            heatmap[dateStr] = (heatmap[dateStr] || 0) + count;
          }
        }
      });
    } catch (err) {

    }
  }

  return heatmap;
}

function parseRecentActivity(html, username) {
  const activity = [];

  const solvedRegex = /<a href="\/status\/([^,"]+),[^"]+">([^<]+)<\/a>/g;
  let match;

  while ((match = solvedRegex.exec(html)) !== null && activity.length < 10) {
    activity.push({
      title: `Solved ${match[2]}`,
      date: "Recently",
      status: "Accepted",
      url: `https://www.codechef.com/status/${match[1]},${username}`,
      platform: "CodeChef",
    });
  }

  return activity;
}

async function getCodeChefProfile(username) {
  const finalUsername = username || process.env.CODECHEF_USERNAME;
  if (!finalUsername) throw new Error("CODECHEF_USERNAME is not set");

  const res = await axios.get(`${BASE_URL}/${finalUsername}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const html = res.data;

  if (html.includes("<title>CodeChef | Non-existing user")) {
    throw new Error("User not found on CodeChef");
  }

  const ratingMatch = html.match(/class="rating-number"[^>]*>\s*(\d+)/i);
  const highestRatingMatch = html.match(/Highest Rating\s*(\d+)/i);
  const globalRankMatch = html.match(/<strong>Global Rank<\/strong>[^<]*<a[^>]*>([0-9a-zA-Z]+)<\/a>/i);
  const countryRankMatch = html.match(/<strong>Country Rank<\/strong>[^<]*<a[^>]*>([0-9a-zA-Z]+)<\/a>/i);
  const starsMatch = html.match(/<span class="rating"[^>]*>(.)★<\/span>/i);
  const avatarMatch = html.match(/<img[^>]*class="profileImage"[^>]*src="([^"]+)"/i);

  const heatmap = parseCodeChefHeatmap(html);
  const activity = parseRecentActivity(html, finalUsername);

  return {
    username: finalUsername,
    avatarUrl: avatarMatch ? avatarMatch[1] : null,
    rating: ratingMatch ? safeInt(ratingMatch[1]) : 0,
    highestRating: highestRatingMatch ? safeInt(highestRatingMatch[1]) : 0,
    stars: starsMatch ? safeInt(starsMatch[1], 1) : 1,
    globalRank: globalRankMatch ? globalRankMatch[1] : "Inactive",
    countryRank: countryRankMatch ? countryRankMatch[1] : "Inactive",
    heatmap,
    activity,
  };
}

async function getCodeChefActivity(username) {
  const finalUsername = username || process.env.CODECHEF_USERNAME;
  try {
    const profileData = await getCodeChefProfile(finalUsername);
    return profileData.activity || [];
  } catch (error) {
    console.error("Error fetching CodeChef activity:", error);
    return [];
  }
}

async function getCodeChefDashboard(username) {
  const finalUsername = username || process.env.CODECHEF_USERNAME;
  const profileData = await getCodeChefProfile(finalUsername);

  return {
    profile: {
      username: profileData.username,
      avatarUrl: profileData.avatarUrl,
      profileUrl: `${BASE_URL}/${profileData.username}`,
    },
    stats: {
      rating: profileData.rating,
      highestRating: profileData.highestRating,
      stars: profileData.stars,
      globalRank: profileData.globalRank,
      countryRank: profileData.countryRank,
    },
    heatmap: profileData.heatmap || {},
    activity: profileData.activity || [],
  };
}

module.exports = {
  getCodeChefDashboard,
  getCodeChefProfile,
  getCodeChefActivity,
};