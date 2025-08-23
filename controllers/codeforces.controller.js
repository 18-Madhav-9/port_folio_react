const {
  getCodeforcesDashboard,
  getCodeforcesProfile,
  getCodeforcesActivity,
} = require("../services/codeforces.service");

exports.fetchCodeforcesDashboard = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODEFORCES_USERNAME;
    const data = await getCodeforcesDashboard(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchCodeforcesProfile = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODEFORCES_USERNAME;
    const data = await getCodeforcesProfile(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchCodeforcesActivity = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODEFORCES_USERNAME;
    const data = await getCodeforcesActivity(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};