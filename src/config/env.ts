import { config } from "dotenv";
config({ path: "../config/.env" });

export const ENV = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://auth:m01093487046d@cluster0.5qh89gm.mongodb.net/auth",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl:
    process.env.CLIENT_URL || "https://mhc-vert-six.vercel.app",
  frontendUrl:
    process.env.FRONTEND_URL ||
    process.env.CLIENT_URL ||
    "https://mhc-vert-six.vercel.app",
  appName: process.env.APP_NAME || "mhc",
  logLevel: process.env.LOG_LEVEL || "debug",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "development",
};
