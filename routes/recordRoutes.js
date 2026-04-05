const express = require("express");
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const handleValidationErrors = require("../middleware/validateMiddleware");
const {
  createRecordValidator,
  updateRecordValidator
} = require("../validators/recordValidators");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorizeRoles("admin"),
  createRecordValidator,
  handleValidationErrors,
  createRecord
);

router.get("/", authorizeRoles("admin", "analyst", "viewer"), getRecords);
router.get("/:id", authorizeRoles("admin", "analyst", "viewer"), getRecordById);

router.put(
  "/:id",
  authorizeRoles("admin"),
  updateRecordValidator,
  handleValidationErrors,
  updateRecord
);

router.delete("/:id", authorizeRoles("admin"), deleteRecord);

module.exports = router;