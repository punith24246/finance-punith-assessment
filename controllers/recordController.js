const FinancialRecord = require("../models/FinancialRecord");

const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await FinancialRecord.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Financial record created successfully",
      record
    });
  } catch (error) {
    next(error);
  }
};

const getRecords = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = { isDeleted: false };

    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const records = await FinancialRecord.find(query)
      .populate("createdBy", "name email role")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await FinancialRecord.countDocuments(query);

    res.status(200).json({
      count: records.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      records
    });
  } catch (error) {
    next(error);
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate("createdBy", "name email role");

    if (!record) {
      res.status(404);
      throw new Error("Record not found");
    }

    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!record) {
      res.status(404);
      throw new Error("Record not found");
    }

    const { amount, type, category, date, notes } = req.body;

    if (amount !== undefined) record.amount = amount;
    if (type !== undefined) record.type = type;
    if (category !== undefined) record.category = category;
    if (date !== undefined) record.date = date;
    if (notes !== undefined) record.notes = notes;

    await record.save();

    res.status(200).json({
      message: "Record updated successfully",
      record
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!record) {
      res.status(404);
      throw new Error("Record not found");
    }

    record.isDeleted = true;
    await record.save();

    res.status(200).json({
      message: "Record deleted successfully (soft delete)"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};