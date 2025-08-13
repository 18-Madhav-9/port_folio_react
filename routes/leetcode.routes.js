const express = require("express");
const router = express.Router();

const {
  fetchLeetCodeDashboard,
  fetchLeetCodeProfile,
  fetchLeetCodeActivity,
} = require("../controllers/leetcode.controller");

router.get("/stats", fetchLeetCodeDashboard);
router.get("/profile", fetchLeetCodeProfile);
router.get("/activity", fetchLeetCodeActivity);

module.exports = router;