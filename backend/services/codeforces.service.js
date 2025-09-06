const axios = require("axios");

const BASE_URL = "https://codeforces.com/api";

async function getCodeforcesProfile(username) {
  try {
    const finalUsername = username || process.env.CODEFORCES_USERNAME;
    if (!finalUsername) throw new Error("CODEFORCES_USERNAME is not set");

    const userInfoRes = await axios.get(`${BASE_URL}/user.info?handles=${finalUsername}`);
    if (userInfoRes.data.status !== "OK" || userInfoRes.data.result.length === 0) {
      throw new Error("User not found on Codeforces");
    }

    return userInfoRes.data.result[0];
  } catch (error) {
    if (error.response?.data?.comment) throw new Error(`Codeforces API: ${error.response.data.comment}`);
    throw new Error(error.message || "Error fetching Codeforces profile");
  }
}

async function getCodeforcesActivity(username) {
  try {
    const finalUsername = username || process.env.CODEFORCES_USERNAME;
    if (!finalUsername) throw new Error("CODEFORCES_USERNAME is not set");

    const userStatusRes = await axios.get(`${BASE_URL}/user.status?handle=${finalUsername}`);
    if (userStatusRes.data.status !== "OK") return [];

    return userStatusRes.data.result;
  } catch (error) {
    if (error.response?.data?.comment) throw new Error(`Codeforces API: ${error.response.data.comment}`);
    throw new Error(error.message || "Error fetching Codeforces activity");
  }
}

async function getCodeforcesDashboard(username) {
  const finalUsername = username || process.env.CODEFORCES_USERNAME;
  if (!finalUsername) throw new Error("CODEFORCES_USERNAME is not set");

  const [profileData, submissions] = await Promise.all([
    getCodeforcesProfile(finalUsername),
    getCodeforcesActivity(finalUsername),
  ]);

  const solvedProblems = new Set();
  const activity = [];

  submissions.forEach((sub) => {
    if (sub.verdict === "OK" && sub.problem) {
      solvedProblems.add(`${sub.problem.contestId}${sub.problem.index}`);
    }

    if (activity.length < 15) {
      activity.push({
        type: "Submission",
        repo: sub.problem.name, 

        createdAt: new Date(sub.creationTimeSeconds * 1000).toISOString(),
        verdict: sub.verdict,
      });
    }
  });

  return {
    profile: {
      username: profileData.handle || finalUsername,
      name: profileData.firstName ? `${profileData.firstName} ${profileData.lastName || ""}`.trim() : profileData.handle,
      avatarUrl: profileData.avatar,
      rank: profileData.rank || "Unrated",
      profileUrl: `https://codeforces.com/profile/${profileData.handle}`,
    },
    stats: {
      rating: profileData.rating || 0,
      maxRating: profileData.maxRating || 0,
      maxRank: profileData.maxRank || "Unrated",
      totalSolved: solvedProblems.size,
    },
    activity: activity,
  };
}

module.exports = {
  getCodeforcesDashboard,
  getCodeforcesProfile,
  getCodeforcesActivity,
};