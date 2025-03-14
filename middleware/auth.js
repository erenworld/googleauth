import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const { JWT_SECRET } = config;

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication invalid" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication invalid" });
  }
};
