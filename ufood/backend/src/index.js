import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env, validateEnv } from "./config/env.js";

validateEnv();

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB();
    server.listen(env.port, () => {
      console.log(`[UFood] API server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("[UFood] Failed to start server:", error.message);
    process.exit(1);
  }
}

function shutdown(signal) {
  console.log(`[UFood] ${signal} received. Closing server...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
