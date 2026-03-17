import { Router } from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Auth Landing Page API is running", timestamp: new Date().toISOString() });
});


export default router;
