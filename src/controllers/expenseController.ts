import { Request, Response } from "express";
import Expense from "../models/expense";
import { AuthRequest } from "../middleware/authMiddleware";

// ✅ Get all expenses for the logged-in user
export const getExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      attributes: ["id", "userId", "description", "category", "amount", "date", "createdAt", "updatedAt"], // ✅ Explicitly include description
    });

    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ msg: "Error fetching expenses", error });
  }
};

// ✅ Add a new expense
export const addExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { description, amount, category, date } = req.body;

  if (!amount || !category || !date) {
    res.status(400).json({ msg: "Amount, category, and date are required" });
    return;
  }

  try {
    const expense = await Expense.create({
      userId: req.user.id,
      description: description || "", // ✅ Ensure description is included (even if empty)
      category,
      amount,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ msg: "Error adding expense", error });
  }
};

// ✅ Delete an expense by ID
export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });

    if (!expense) {
      res.status(404).json({ msg: "Expense not found" });
      return;
    }

    await expense.destroy();
    res.json({ msg: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ msg: "Error deleting expense", error });
  }
};
