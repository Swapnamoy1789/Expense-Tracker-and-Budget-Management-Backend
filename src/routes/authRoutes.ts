import express from "express";
import { check } from "express-validator";
import { register, login } from "../controllers/authController";

const router = express.Router();

const validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
];

// Utility function to handle async route errors
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Use asyncHandler to properly handle errors
router.post("/register", validateRegister, asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
