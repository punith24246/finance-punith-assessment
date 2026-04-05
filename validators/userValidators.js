const { body } = require("express-validator");

const updateUserValidator = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status")
];

module.exports = { updateUserValidator };