import express from 'express';
import { env } from '@/config/env.config';
import { configCache } from '@/config/cache.config';
import { configRoutes } from '@/config/routes.config';
import { configDatabase } from '@/config/database.config';

const main = async () => {
  const app = express();

  app.use(express.json());

  await configCache();
  await configDatabase();

  configRoutes(app);

  app.listen(env.APPLICATION_PORT, () => {
    console.log(
      `Server is running on http://localhost:${env.APPLICATION_PORT}`,
    );
  });
};

main();
