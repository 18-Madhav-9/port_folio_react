const {
  getGithubDashboard,
  getGithubProfile,
  getGithubRecentActivity,
  getGithubContributionData,
  getGithubLanguagesAndRepos,
} = require("../services/github.service");

exports.fetchGithubDashboard = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    const data = await getGithubDashboard(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchGithubProfile = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    const data = await getGithubProfile(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchGithubActivity = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    const data = await getGithubRecentActivity(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchGithubHeatmap = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    const data = await getGithubContributionData(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchGithubLanguages = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    const data = await getGithubLanguagesAndRepos(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};