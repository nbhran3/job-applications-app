import express from "express";
import { AppDataSource } from "./datasource.js";
import * as AuthenticationController from "./controllers/authentication-controller.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post("/register", AuthenticationController.registerUser);

app.post("/login", AuthenticationController.loginUser);

const main = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Authentication server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
};

main();
