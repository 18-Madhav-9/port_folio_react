const axios = require("axios");

const GRAPHQL_URL = "https://leetcode.com/graphql";

async function getLeetCodeRawData(username) {
  const finalUsername = username || process.env.LEETCODE_USERNAME;
  if (!finalUsername) throw new Error("LEETCODE_USERNAME is not set");

  // ADDED userCalendar to the GraphQL query
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        profile { realName, userAvatar, ranking }
        submitStats {
          acSubmissionNum { difficulty, count, submissions }
          totalSubmissionNum { difficulty, count, submissions }
        }
        userCalendar {
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        rating
      }
      recentAcSubmissionList(username: $username, limit: 15) {
        id
        title
        timestamp
      }
    }
  `;

  const res = await axios.post(
    GRAPHQL_URL,
    { query, variables: { username: finalUsername } },
    {
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
    }
  );

  const userData = res.data?.data?.matchedUser;
  if (!userData) throw new Error("User not found on LeetCode");

  return {
    profile: userData.profile,
    stats: userData.submitStats,
    calendar: userData.userCalendar?.submissionCalendar,
    contestRanking: res.data?.data?.userContestRanking,
    recentActivity: res.data?.data?.recentAcSubmissionList || [],
    username: finalUsername,
  };
}

async function getLeetCodeProfile(username) {
  const data = await getLeetCodeRawData(username);
  return data.profile;
}

async function getLeetCodeActivity(username) {
  const data = await getLeetCodeRawData(username);
  return data.recentActivity;
}

async function getLeetCodeDashboard(username) {
  const data = await getLeetCodeRawData(username);

  const acStats = data.stats.acSubmissionNum;
  const totalSubmissionsData = data.stats.totalSubmissionNum;

  const totalAc = acStats.find((s) => s.difficulty === "All")?.count || 0;
  const totalSubmissions = totalSubmissionsData.find((s) => s.difficulty === "All")?.submissions || 0;
  const totalAcSubmissions = acStats.find((s) => s.difficulty === "All")?.submissions || 0;

  const acceptanceRate = totalSubmissions === 0 ? 0 : ((totalAcSubmissions / totalSubmissions) * 100).toFixed(2);
  const contestRating = data.contestRanking?.rating;

  // Transform UNIX Timestamps to YYYY-MM-DD for heatmap
  const heatmap = {};
  if (data.calendar) {
    const calendarData = JSON.parse(data.calendar);
    for (const [timestamp, count] of Object.entries(calendarData)) {
      const date = new Date(parseInt(timestamp) * 1000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      heatmap[`${yyyy}-${mm}-${dd}`] = count;
    }
  }

  return {
    profile: {
      username: data.username,
      name: data.profile.realName,
      avatarUrl: data.profile.userAvatar,
      rank: data.profile.ranking,
      profileUrl: `https://leetcode.com/${data.username}`,
    },
    stats: {
      rating: contestRating ? Math.round(contestRating) : null,
      totalSolved: totalAc,
      easySolved: acStats.find((s) => s.difficulty === "Easy")?.count || 0,
      mediumSolved: acStats.find((s) => s.difficulty === "Medium")?.count || 0,
      hardSolved: acStats.find((s) => s.difficulty === "Hard")?.count || 0,
      acceptanceRate: `${acceptanceRate}%`,
    },
    heatmap: heatmap, // MUST return heatmap payload
    activity: data.recentActivity.map((ac) => ({
      type: "Submission",
      repo: ac.title,
      createdAt: new Date(ac.timestamp * 1000).toISOString(),
    })),
  };
}

module.exports = {
  getLeetCodeDashboard,
  getLeetCodeProfile,
  getLeetCodeActivity,
};