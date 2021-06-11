import { Router } from 'express';

import SpecificationController from '../controllers/specification/SpecificationController';

const specificationsRoutes = Router();
const specificationController = new SpecificationController();

specificationsRoutes.post('/', specificationController.store);

export default specificationsRoutes;
