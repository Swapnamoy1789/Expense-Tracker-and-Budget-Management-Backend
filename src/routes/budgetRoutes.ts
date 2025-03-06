import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { getBudgets, addBudget, deleteBudget } from "../controllers/budgetController";

const router = express.Router();

// ✅ Use `authenticateUser` as a middleware before protected routes
router.get("/", authenticateUser, getBudgets);
router.post("/", authenticateUser, addBudget);
router.delete("/:id", authenticateUser, deleteBudget);

export default router;
