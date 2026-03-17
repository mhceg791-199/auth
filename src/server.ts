// import express from "express";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";

// import { ENV } from "./config/env.js";
// import { connectDatabase } from "./config/database.js";
// import { helmetConfig, corsConfig } from "./config/security.js";
// import { swaggerSpec } from "./config/swagger.js";
// import { requestLogger } from "./middlewares/requestLogger.js";
// import { generalLimiter } from "./middlewares/rateLimiter.js";
// import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
// import routes from "./routes/index.js";
// import { logger } from "./utils/logger.js";

// const app = express();

// /* ─── Middlewares ─── */
// app.use(helmetConfig);
// app.use(corsConfig);
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(requestLogger);
// app.use(generalLimiter);

// /* ─── Swagger ─── */
// app.use(
//   "/api/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     customCss: ".swagger-ui .topbar { display: none }",
//     customSiteTitle: "Auth Landing Page API Docs",
//   })
// );

// app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// /* ─── Routes ─── */
// app.use("/api", routes);

// /* ─── Errors ─── */
// app.use("/api/*", notFoundHandler);
// app.use(errorHandler);

// /* ───────────────────────────────────────────── */
// /* 🔴 IMPORTANT PART */
// /* ───────────────────────────────────────────── */

// /**
//  * Local development only
//  * Vercel will NOT run this
//  */
// if (process.env.VERCEL !== "1") {
//   (async () => {
//     try {
//       await connectDatabase();
//       app.listen(ENV.port, () => {
//         logger.info(`🚀 API running on http://localhost:${ENV.port}`);
//       });
//     } catch (err) {
//       logger.error("Failed to start server", err);
//       process.exit(1);
//     }
//   })();
// }

// /**
//  * Vercel entry point
//  */
// export default async function handler(req: any, res: any) {
//   await connectDatabase();
//   return app(req, res);
// }


import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { connectDatabase } from "./config/database.js";
import { helmetConfig, corsConfig } from "./config/security.js";
import { swaggerSpec } from "./config/swagger.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
import { logger } from "./utils/logger.js";

const app = express();

// مهم: نمنع تكرار الاتصال بالداتابيز
let isConnected = false;

// ─── Middleware ─────────────────────────
app.use(helmetConfig);
app.use(corsConfig);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(generalLimiter);

// ─── Swagger ────────────────────────────
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Auth Landing Page API Docs",
  })
);

app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// ─── Routes ─────────────────────────────
app.use("/api", routes);

// ─── Errors ─────────────────────────────
app.use("/api/*", notFoundHandler);
app.use(errorHandler);

// ✅ دي أهم حاجة في Vercel
export default async function handler(req: any, res: any) {
  try {
    if (!isConnected) {
      await connectDatabase();
      isConnected = true;
      logger.info("Database connected ✅");
    }

    return app(req, res);
  } catch (error) {
    logger.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// import express from "express";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";

// import { ENV } from "./config/env.js";
// import { connectDatabase } from "./config/database.js";
// import { helmetConfig, corsConfig } from "./config/security.js";
// import { swaggerSpec } from "./config/swagger.js";
// import { requestLogger } from "./middlewares/requestLogger.js";
// import { generalLimiter } from "./middlewares/rateLimiter.js";
// import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
// import routes from "./routes/index.js";
// import { logger } from "./utils/logger.js";

// const app = express();


// // ─── Global middleware ───────────────────────────────────────
// app.use(helmetConfig);
// app.use(corsConfig);
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(requestLogger);
// app.use(generalLimiter);

// // ─── API Documentation ──────────────────────────────────────
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//   customCss: ".swagger-ui .topbar { display: none }",
//   customSiteTitle: "Auth Landing Page API Docs",
// }));
// app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// // ─── API Routes ─────────────────────────────────────────────
// app.use("/api", routes);

// // ─── Error handling ─────────────────────────────────────────
// app.use("/api/*", notFoundHandler);
// app.use(errorHandler);

// // ─── Start server ───────────────────────────────────────────
// async function start(): Promise<void> {
//   try {
//     await connectDatabase();

//     const port = ENV.port;
//     app.listen(port, () => {
//       logger.info(`🏰 Auth Landing Page API running on port ${port}`);
//       logger.info(`📚 API Docs: http://localhost:${port}/api/docs`);
//       logger.info(`🔧 Environment: ${ENV.nodeEnv}`);
//     });
//   } catch (error) {
//     logger.error("Failed to start server:", error);
//     process.exit(1);
//   }
// }

// // Graceful shutdown
// process.on("SIGTERM", () => {
//   logger.info("SIGTERM received, shutting down gracefully...");
//   process.exit(0);
// });

// process.on("unhandledRejection", (reason) => {
//   logger.error("Unhandled Rejection:", reason);
// });

// process.on("uncaughtException", (error) => {
//   logger.error("Uncaught Exception:", error);
//   process.exit(1);
// });

// start();

// export default app;
