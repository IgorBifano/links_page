import type { NextFunction, Request, Response } from "express";
import { env } from "@/config/env";

export function requireAdminApiKey(request: Request, response: Response, next: NextFunction) {
  if (!env.ADMIN_API_KEY) {
    next();
    return;
  }

  const apiKey = request.header("x-admin-api-key");

  if (apiKey !== env.ADMIN_API_KEY) {
    response.status(401).json({
      error: "Unauthorized"
    });
    return;
  }

  next();
}
