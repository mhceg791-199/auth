import { Router, Request, Response } from "express";
import { generateSitemap, generateRobotsTxt } from "../utils/sitemap.js";
import { ENV } from "../config/env.js";

const router = Router();

router.get("/sitemap.xml", async (_req: Request, res: Response) => {
  try {
    const baseUrl = ENV.clientUrl || "https://auth-landing-pagebymhc.com";
    const sitemap = await generateSitemap(baseUrl);
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    res.status(500).send("Error generating sitemap");
  }
});

router.get("/robots.txt", (_req: Request, res: Response) => {
  const baseUrl = ENV.clientUrl || "https://auth-landing-pagebymhc.com";
  res.header("Content-Type", "text/plain");
  res.send(generateRobotsTxt(baseUrl));
});

export default router;
