import { Router } from 'express';

import SpecificationController from '../controllers/specification/SpecificationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();
const specificationController = new SpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', specificationController.store);

export default specificationsRoutes;
