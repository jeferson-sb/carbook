import express from 'express';
import swaggerUi from 'swagger-ui-express';

import expressRoutes from './routes';
import swaggerFile from '../../swagger.json';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(expressRoutes);

app.listen(3333, () => console.log(`Server is up and running on port 3333`));
