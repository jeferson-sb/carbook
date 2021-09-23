import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import createConnection from '@infrastructure/database/index';
import { rateLimiter } from '@presentation/api/middlewares/rateLimiter';
import expressRoutes from './routes';
import swaggerFile from './swagger.json';
import { HTTPError } from './errors/HTTPError';

const app = express();

createConnection();

app.use(rateLimiter);
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(expressRoutes);
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof HTTPError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log(`Server is up and running on port 3333`));
