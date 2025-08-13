const express = require("express");
const router = express.Router();

const {
  fetchCodeforcesDashboard,
  fetchCodeforcesProfile,
  fetchCodeforcesActivity,
} = require("../controllers/codeforces.controller");

router.get("/stats", fetchCodeforcesDashboard);
router.get("/profile", fetchCodeforcesProfile);
router.get("/activity", fetchCodeforcesActivity);

module.exports = router;