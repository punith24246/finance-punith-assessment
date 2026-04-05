const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const handleValidationErrors = require("../middleware/validateMiddleware");

const router = express.Router();

router.post("/register", registerValidator, handleValidationErrors, register);
router.post("/login", loginValidator, handleValidationErrors, login);

module.exports = router;