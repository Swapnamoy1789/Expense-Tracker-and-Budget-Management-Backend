import express from "express";
import { getDashboardData } from "../controllers/dashboardController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateUser, getDashboardData);

export default router;
