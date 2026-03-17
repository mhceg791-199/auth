import { Router } from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Auth Landing Page API is running", timestamp: new Date().toISOString() });
});

export default router;
