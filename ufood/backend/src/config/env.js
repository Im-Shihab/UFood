import dotenv from "dotenv";

dotenv.config();

const clientUrls = (process.env.CLIENT_URLS || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

export const env = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  clientUrls,
  mongoUri: process.env.MONGODB_URI || "",
};

export function validateEnv() {
  if (!env.mongoUri) {
    console.warn(
      "[UFood] WARNING: MONGODB_URI is not set in backend/.env. Database will stay disconnected until configured."
    );
  }
}
