import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getDbStatus } from "./config/db.js";
import { env } from "./config/env.js";
import { AppError, errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools like Postman/curl (no Origin header) and allowlisted frontends
      if (!origin || env.clientUrls.includes(origin)) {
        return callback(null, true);
      }
      return callback(new AppError("CORS origin not allowed", 403, "CORS_FORBIDDEN"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Step 01 Health Endpoint
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "ufood-api",
    environment: env.nodeEnv,
    database: getDbStatus(),
    timestamp: new Date().toISOString(),
  });
});

// Future step routes will be mounted here under /api/v1/*

app.use(notFound);
app.use(errorHandler);

export default app;
