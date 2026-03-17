import { Router } from "express";
import { register, login, logout, getMe, updateProfile, changePassword } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.put("/profile", requireAuth, updateProfile);
router.put("/password", requireAuth, changePassword);

export default router;
