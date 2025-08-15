const axios = require("axios");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const LANGUAGE_REPO_LIMIT = Number(process.env.GITHUB_LANGUAGE_REPO_LIMIT || 10);

const REST_BASE_URL = "https://api.github.com";
const GRAPHQL_URL = "https://api.github.com/graphql";

const commonHeaders = {
  Accept: "application/vnd.github+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

const rest = axios.create({
  baseURL: REST_BASE_URL,
  headers: commonHeaders,
});

const graphql = axios.create({
  baseURL: GRAPHQL_URL,
  headers: commonHeaders,
});

function compactNumber(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);
}

async function getAllRepos(username) {
  const allRepos = [];
  let page = 1;

  while (true) {
    const res = await rest.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        page,
        type: "owner",
        sort: "updated",
      },
    });

    allRepos.push(...res.data);

    if (res.data.length < 100) break;
    page += 1;
  }

  return allRepos;
}

async function getGithubProfile(username) {
  const res = await rest.get(`/users/${username}`);
  return res.data;
}

async function getGithubContributionData(username) {
  if (!GITHUB_TOKEN) {
    return {
      totalCommitContributions: 0,
      totalContributions: 0,
      weeks: [],
      days: [],
    };
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphql.post("", {
    query,
    variables: { login: username },
  });

  const collection = res.data?.data?.user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;

  const weeks = calendar?.weeks || [];
  const days = weeks.flatMap((week) => week.contributionDays || []);

  return {
    totalCommitContributions: collection?.totalCommitContributions || 0,
    totalContributions: calendar?.totalContributions || 0,
    weeks,
    days,
  };
}

async function getGithubRecentActivity(username) {
  const res = await rest.get(`/users/${username}/events/public`, {
    params: { per_page: 30 },
  });

  return res.data.map((event) => ({
    type: event.type,
    repo: event.repo?.name || null,
    createdAt: event.created_at,
    id: event.id,
  }));
}

async function getGithubLanguagesAndRepos(username) {
  const repos = await getAllRepos(username);

  const sortedRepos = [...repos].sort(
    (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
  );

  const topRepos = sortedRepos.slice(0, 6).map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    language: repo.language,
    updatedAt: repo.updated_at,
  }));

  const reposForLanguages = sortedRepos.slice(0, LANGUAGE_REPO_LIMIT);

  const languageMaps = await Promise.all(
    reposForLanguages.map(async (repo) => {
      if (!repo.languages_url) return {};
      const res = await axios.get(repo.languages_url, {
        headers: commonHeaders,
      });
      return res.data || {};
    })
  );

  const languageTotals = {};

  for (const langMap of languageMaps) {
    for (const [language, bytes] of Object.entries(langMap)) {
      languageTotals[language] = (languageTotals[language] || 0) + bytes;
    }
  }

  const totalBytes = Object.values(languageTotals).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  const languageBreakdown = Object.entries(languageTotals)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: totalBytes ? Number(((bytes / totalBytes) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return {
    repos,
    topRepos,
    totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
    totalForks: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
    languageBreakdown,
    codeVolumeBytes: totalBytes,
    codeVolumeLabel: compactNumber(totalBytes),
  };
}

async function getGithubDashboard(username = GITHUB_USERNAME) {
  if (!username) {
    throw new Error("GITHUB_USERNAME is not set");
  }

  const [profile, contributionData, activityData, repoData] = await Promise.all([
    getGithubProfile(username),
    getGithubContributionData(username),
    getGithubRecentActivity(username),
    getGithubLanguagesAndRepos(username),
  ]);

  return {
    profile: {
      username: profile.login,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      company: profile.company,
      blog: profile.blog,
      website: profile.blog,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
      publicGists: profile.public_gists,
      profileUrl: profile.html_url,
    },

    stats: {
      commits: contributionData.totalCommitContributions,
      contributions: contributionData.totalContributions,
      stars: repoData.totalStars,
      forks: repoData.totalForks,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      codeVolumeBytes: repoData.codeVolumeBytes,
      codeVolumeLabel: repoData.codeVolumeLabel,
    },

    heatmap: {
      weeks: contributionData.weeks,
      days: contributionData.days,
      totalContributions: contributionData.totalContributions,
      totalCommitContributions: contributionData.totalCommitContributions,
    },

    activity: activityData,

    languages: {
      totalBytes: repoData.codeVolumeBytes,
      breakdown: repoData.languageBreakdown,
    },

    repos: repoData.topRepos,
  };
}

module.exports = {
  getGithubDashboard,
  getGithubProfile,
  getGithubRecentActivity,
  getGithubLanguagesAndRepos,
  getGithubContributionData,
};