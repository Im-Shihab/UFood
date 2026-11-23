import mongoose from "mongoose";
import { env } from "./env.js";

const DB_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export function getDbStatus() {
  return DB_STATES[mongoose.connection.readyState] || "unknown";
}

export async function connectDB() {
  if (!env.mongoUri) {
    return false;
  }

  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`[UFood] MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[UFood] MongoDB connection failed: ${error.message}`);
    throw error;
  }
}
