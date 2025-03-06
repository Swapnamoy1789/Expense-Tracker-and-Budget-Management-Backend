import { Request, Response } from "express";
import Expense from "../models/expense";
import Budget from "../models/budget";
import { AuthRequest } from "../middleware/authMiddleware";

export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    const totalExpenses = await Expense.sum("amount", { where: { userId: req.user.id } });
    const totalBudget = await Budget.sum("limit", { where: { userId: req.user.id } });

    res.json({ totalExpenses, remainingBudget: totalBudget - totalExpenses });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ msg: "Error fetching dashboard data" });
  }
};
