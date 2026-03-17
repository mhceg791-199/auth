import { Router, Request, Response } from "express";
import {  generateRobotsTxt } from "../utils/sitemap.js";
import { ENV } from "../config/env.js";

const router = Router();

router.get("/robots.txt", (_req: Request, res: Response) => {
  const baseUrl = ENV.clientUrl || "https://auth-landing-pagebymhc.com";
  res.header("Content-Type", "text/plain");
  res.send(generateRobotsTxt(baseUrl));
});

export default router;
