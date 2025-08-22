const {
  getLeetCodeDashboard,
  getLeetCodeProfile,
  getLeetCodeActivity,
} = require("../services/leetcode.service");

exports.fetchLeetCodeDashboard = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.LEETCODE_USERNAME;
    const data = await getLeetCodeDashboard(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchLeetCodeProfile = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.LEETCODE_USERNAME;
    const data = await getLeetCodeProfile(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchLeetCodeActivity = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.LEETCODE_USERNAME;
    const data = await getLeetCodeActivity(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};