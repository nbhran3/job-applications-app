import * as AuthenticationService from "../services/authentication-service.js";
import type { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth-schema.js";

export const registerUser = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ error: errorMessages.join(",") });
  } else {
    const { email, password } = result.data;

    try {
      await AuthenticationService.registerUser(email, password);
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === "Email is already in use.") {
        return res.status(409).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ error: errorMessages.join(",") });
  } else {
    const { email, password } = result.data;
    try {
      const { token, user } = await AuthenticationService.loginUser(
        email,
        password
      );

      return res.json({
        message: "Login successful",
        id: user.id,
        email: user.email,
        token: token,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials.") {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
