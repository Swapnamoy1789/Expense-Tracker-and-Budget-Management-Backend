import { Request, Response } from "express";
import Expense from "../models/expense";
import { AuthRequest } from "../middleware/authMiddleware";
import { Op } from "sequelize";

export const getReports = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });

    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const monthlyTotals: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
    });

    res.json({ expenses, categoryTotals, monthlyTotals });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ msg: "Error fetching reports" });
  }
};
