import { AppDataSource } from "../datasource.js";
import { User } from "../entities/user.js";

const userRepository = AppDataSource.getRepository(User);

export const getUserByEmail = async (email: string) => {
  const user = await userRepository.findOne({
    where: { email: email },
  });

  return user;
};

// Create and save a new user in the database
export const createUser = async (email: string, hashed_password: string) => {
  // Create an in-memory User entity
  const newUser = userRepository.create({
    email: email,
    hashed_password: hashed_password,
  });

  // Persist the new user to the database
  const savedUser = await userRepository.save(newUser);

  return savedUser;
};
