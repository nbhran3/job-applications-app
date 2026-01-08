import { DataSource } from "typeorm";
import { Company } from "./entities/company-entity.js";
import { Application } from "./entities/applications-entity.js";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  { key: "DB_HOST", value: process.env.DB_HOST },
  { key: "DB_USER", value: process.env.DB_USER },
  { key: "DB_PASS", value: process.env.DB_PASS },
  { key: "DB_NAME", value: process.env.DB_NAME },
];

requiredEnvVariables.forEach((envVar) => {
  if (!envVar.value) {
    throw new Error(`Missing required environment variable: ${envVar.key}`);
  }
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: true,
  entities: [Company, Application],
});

export { AppDataSource };
