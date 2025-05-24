import type { Application } from "express";
import urlRoutes from "@/routes/url.routes";
import healthRoutes from "@/routes/health.routes";

export const configRoutes = (app: Application) => {
  urlRoutes(app);
  healthRoutes(app);
};
