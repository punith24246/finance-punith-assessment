const express = require("express");
const { getDashboardSummary } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.get("/summary", authorizeRoles("admin", "analyst", "viewer"), getDashboardSummary);

module.exports = router;