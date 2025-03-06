import { Response } from "express";
import Budget from "../models/budget";
import { AuthRequest } from "../middleware/authMiddleware";

export const getBudgets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const budgets = await Budget.findAll({ where: { userId: req.user.id } });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching budgets", error });
  }
};

export const addBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  const { category, limit } = req.body;

  if (!category || !limit) {
    res.status(400).json({ msg: "Category and limit are required" });
    return;
  }

  try {
    const budget = await Budget.create({ category, limit, userId: req.user.id });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ msg: "Error adding budget", error });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const budget = await Budget.findOne({ where: { id, userId: req.user.id } });

    if (!budget) {
      res.status(404).json({ msg: "Budget not found" });
      return;
    }

    await budget.destroy();
    res.json({ msg: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting budget", error });
  }
};
