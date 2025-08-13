const express = require("express");
const router = express.Router();

const {
  fetchGithubDashboard,
  fetchGithubProfile,
  fetchGithubActivity,
  fetchGithubHeatmap,
  fetchGithubLanguages,
} = require("../controllers/github.controller");

router.get("/stats", fetchGithubDashboard);
router.get("/profile", fetchGithubProfile);
router.get("/activity", fetchGithubActivity);
router.get("/heatmap", fetchGithubHeatmap);
router.get("/languages", fetchGithubLanguages);

module.exports = router;