import { type Application, Router } from 'express';
import * as HealthControllers from '@/controllers/health.controller';

export default function (app: Application) {
  const router = Router();

  router.get('/', HealthControllers.check);

  app.use('/api/health', router);
}
