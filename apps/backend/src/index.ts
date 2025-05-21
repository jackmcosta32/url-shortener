import express from "express";
import { env } from "@/config/env.config";
import { configRoutes } from "@/config/routes.config";
import { configDatabase } from "@/config/database.config";

const main = async () => {
  const app = express();

  app.use(express.json());

  configRoutes(app);

  await configDatabase();

  app.listen(env.APPLICATION_PORT, () => {
    console.log(
      `Server is running on http://localhost:${env.APPLICATION_PORT}`
    );
  });
};

main();
