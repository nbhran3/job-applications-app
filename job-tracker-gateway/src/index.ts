import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticateToken } from "./middleware/authenticate-token.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const MANAGEMENT_SERVICE_URL = process.env.MANAGEMENT_SERVICE_URL;

app.use(
  "/auth",
  createProxyMiddleware({ target: AUTH_SERVICE_URL, changeOrigin: true })
);

app.use(
  "/job-tracker",
  authenticateToken,
  (req, res, next) => {
    const userId = req.user?.id;
    req.headers["x-user-id"] = userId?.toString() || "";
    next();
  },
  createProxyMiddleware({
    target: MANAGEMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/job-tracker": "", // Remove /job-tracker prefix
    },
  })
);

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
