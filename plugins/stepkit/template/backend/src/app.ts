import express, { type NextFunction, type Request, type Response, type Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { SERVER_MESSAGES } from '@app/shared';
import { env } from './env';
import { authenticate } from './middleware/authenticate';
import { sendError } from './middleware/errors';
import { healthRoutes } from './modules/health/health.routes';

interface AppOptions {
  /** Dodatkowe trasy pod /api (moduły dopisują się w routes poniżej; testy podają własne). */
  extraRoutes?: Router;
}

export function createApp(options: AppOptions = {}) {
  const app = express();
  // Na serwerze aplikacja stoi za Caddy: bez tego limit logowania liczyłby wszystkich jako jedną osobę.
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(authenticate);

  const api = express.Router();
  api.use(healthRoutes);
  // Tu moduły dopisują swoje trasy, np.: api.use('/orders', ordersRoutes);
  if (options.extraRoutes) api.use(options.extraRoutes);
  app.use('/api', api);

  app.use('/api', (_req, res) => sendError(res, 404, SERVER_MESSAGES.notFound));
  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    sendError(res, 500, SERVER_MESSAGES.serverError);
  });
  return app;
}
