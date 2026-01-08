import * as UserRepository from "../repositories/user-repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const requiredEnvVariables = [
  { key: "SALT_ROUNDS", value: process.env.SALT_ROUNDS },
  { key: "JWT_SECRET", value: process.env.JWT_SECRET },
];

requiredEnvVariables.forEach((envVar) => {
  if (!envVar.value) {
    throw new Error(`Missing required environment variable: ${envVar.key}`);
  }
});

export const getUserByEmail = async (email: string) => {
  return await UserRepository.getUserByEmail(email);
};

export const registerUser = async (email: string, password: string) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email is already in use.");
  } else {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    return await UserRepository.createUser(email, hashedPassword);
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const isValidPassword = await bcrypt.compare(password, user.hashed_password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials.");
  } else {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    return {
      token,
      user: { id: user.id, email: user.email },
    };
  }
};
