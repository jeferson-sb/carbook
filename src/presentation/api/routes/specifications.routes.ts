import { Router } from 'express';

import SpecificationController from '../controllers/specification/SpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();
const specificationController = new SpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  specificationController.store,
);

export default specificationsRoutes;
