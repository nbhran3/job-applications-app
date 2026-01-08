import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ error: "Unauthorized. No token provided" });
    return;
  }

  jwt.verify(token, JWT_SECRET!, (err, user) => {
    if (err) {
      console.log("GATEWAY JWT VERIFY ERROR:", err);
      res.sendStatus(403);
      return;
    }
    req.user = user as { id: number; email: string };
    next();
  });
}
