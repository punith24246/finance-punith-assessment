const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const handleValidationErrors = require("../middleware/validateMiddleware");
const { updateUserValidator } = require("../validators/userValidators");

const router = express.Router();

router.use(protect);

router.post("/", authorizeRoles("admin"), createUser);
router.get("/", authorizeRoles("admin"), getUsers);
router.get("/:id", authorizeRoles("admin"), getUserById);
router.patch("/:id", authorizeRoles("admin"), updateUserValidator, handleValidationErrors, updateUser);

module.exports = router;