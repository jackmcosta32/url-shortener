import { type Application, Router } from "express";
import * as UrlControllers from "@/controllers/url.controller";

export default function (app: Application) {
  const router = Router();

  router.get("/", UrlControllers.index);
  router.post("/", UrlControllers.create);
  router.get("/:id", UrlControllers.findById);

  app.use("/api/url", router);

  app.get("/url/:encodedUri", UrlControllers.redirectToDecodedUri);
}
