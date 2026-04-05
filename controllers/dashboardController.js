const FinancialRecord = require("../models/FinancialRecord");

const getDashboardSummary = async (req, res, next) => {
  try {
    const baseMatch = { isDeleted: false };

    const incomeResult = await FinancialRecord.aggregate([
      { $match: { ...baseMatch, type: "income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
    ]);

    const expenseResult = await FinancialRecord.aggregate([
      { $match: { ...baseMatch, type: "expense" } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
    ]);

    const categoryWiseTotals = await FinancialRecord.aggregate([
      { $match: baseMatch },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          type: "$_id.type",
          total: 1
        }
      },
      { $sort: { total: -1 } }
    ]);

    const monthlyTrends = await FinancialRecord.aggregate([
      { $match: baseMatch },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          type: "$_id.type",
          total: 1
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    const recentActivity = await FinancialRecord.find(baseMatch)
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 })
      .limit(5);

    const totalIncome = incomeResult[0]?.totalIncome || 0;
    const totalExpense = expenseResult[0]?.totalExpense || 0;
    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryWiseTotals,
      monthlyTrends,
      recentActivity
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardSummary };