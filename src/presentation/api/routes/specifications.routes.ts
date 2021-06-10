import { Router } from 'express';

import SpecificationController from '../controllers/specification/SpecificationController';

const specificationsRouter = Router();
const specificationController = new SpecificationController();

specificationsRouter.post('/', specificationController.store);

export default specificationsRouter;
