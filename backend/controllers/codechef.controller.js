const {
  getCodeChefDashboard,
  getCodeChefProfile,
  getCodeChefActivity,
} = require("../services/codechef.service");

exports.fetchCodeChefDashboard = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODECHEF_USERNAME;
    const data = await getCodeChefDashboard(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchCodeChefProfile = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODECHEF_USERNAME;
    const data = await getCodeChefProfile(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchCodeChefActivity = async (req, res, next) => {
  try {
    const username = req.query.username || process.env.CODECHEF_USERNAME;
    const data = await getCodeChefActivity(username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};