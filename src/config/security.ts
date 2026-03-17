import helmet from "helmet";
import cors from "cors";
import { ENV } from "./env.js";

export const helmetConfig = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Disable CSP for API server
});

export const corsConfig = cors({
  origin: ENV.isProduction
    ? [ENV.clientUrl]
    : [ENV.clientUrl, "https://auth-landing-page-vert-six.vercel.app", "http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
