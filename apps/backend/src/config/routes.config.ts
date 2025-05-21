import urlRoutes from "@/routes/url.routes";
import type { Application } from "express";

export const configRoutes = (app: Application) => {
  urlRoutes(app);
};
