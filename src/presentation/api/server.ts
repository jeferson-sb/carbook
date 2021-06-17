import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import expressRoutes from './routes';
import swaggerFile from '../swagger.json';
import '../../infra/database';
import { HTTPError } from '../../infra/http/HTTPError';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(expressRoutes);
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
