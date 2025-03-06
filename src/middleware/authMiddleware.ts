import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Export AuthRequest type
export interface AuthRequest extends Request {
  user?: any; // Attach user data to the request
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
    return; // ✅ Prevent further execution
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); // ✅ Call `next()` to pass control to next middleware
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
