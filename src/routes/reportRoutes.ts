import express from "express";
import { getReports } from "../controllers/reportController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateUser, getReports);

export default router;
