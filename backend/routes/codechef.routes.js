const express = require("express");
const router = express.Router();

const {
  fetchCodeChefDashboard,
  fetchCodeChefProfile,
  fetchCodeChefActivity,
} = require("../controllers/codechef.controller");

router.get("/stats", fetchCodeChefDashboard);
router.get("/profile", fetchCodeChefProfile);
router.get("/activity", fetchCodeChefActivity);

module.exports = router;