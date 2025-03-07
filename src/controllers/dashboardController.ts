import { Request, Response } from "express";
import Expense from "../models/expense";
import Budget from "../models/budget";
import { AuthRequest } from "../middleware/authMiddleware";

export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    // Fetch budgets grouped by category
    const budgets = await Budget.findAll({ where: { userId: req.user.id } });

    // Fetch expenses grouped by category
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });

    // ✅ Create an object to store category-wise budget & expenses
    const categoryBudgets: Record<
      string,
      { budget: number; spent: number; remaining: number }
    > = {};

    // Loop through budgets and initialize categories
    budgets.forEach((budget) => {
      const category = budget.category;
      if (!categoryBudgets[category]) {
        categoryBudgets[category] = { budget: 0, spent: 0, remaining: 0 };
      }
      categoryBudgets[category].budget += budget.limit;
    });

    // Loop through expenses and update spent amounts
    expenses.forEach((expense) => {
      const category = expense.category;
      if (!categoryBudgets[category]) {
        categoryBudgets[category] = { budget: 0, spent: 0, remaining: 0 };
      }
      categoryBudgets[category].spent += expense.amount;
    });

    // ✅ Calculate remaining budget per category
    Object.keys(categoryBudgets).forEach((category) => {
      categoryBudgets[category].remaining =
        categoryBudgets[category].budget - categoryBudgets[category].spent;
    });

    res.json({ categoryBudgets });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ msg: "Error fetching dashboard data" });
  }
};
