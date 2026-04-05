const { body } = require("express-validator");

const createRecordValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be valid"),
  body("notes").optional().isString().withMessage("Notes must be a string")
];

const updateRecordValidator = [
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").optional().notEmpty().withMessage("Category cannot be empty"),
  body("date").optional().isISO8601().withMessage("Date must be valid"),
  body("notes").optional().isString().withMessage("Notes must be a string")
];

module.exports = { createRecordValidator, updateRecordValidator };