import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { env } from "@/config/env";
import { logger } from "@/lib/logger";
import "@/lib/database";
import { adminRoutes } from "@/routes/admin-routes";
import { publicRoutes } from "@/routes/public-routes";
import { startBackgroundJobRunner } from "@/services/background-job-runner";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed"));
    }
  })
);
app.use(express.json());

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  logger.error("Unhandled request error", { message: error.message });
  response.status(500).json({
    error: "Internal server error"
  });
});

app.listen(env.PORT, () => {
  logger.info("Backend server started", {
    port: env.PORT,
    databasePath: env.databasePath
  });
});

startBackgroundJobRunner();
