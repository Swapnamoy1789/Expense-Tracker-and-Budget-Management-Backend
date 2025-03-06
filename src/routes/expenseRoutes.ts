import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { getExpenses, addExpense, deleteExpense } from "../controllers/expenseController";

const router = express.Router();

// ✅ Use `authenticateUser` as a middleware before protected routes
router.get("/", authenticateUser, getExpenses);
router.post("/", authenticateUser, addExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;
