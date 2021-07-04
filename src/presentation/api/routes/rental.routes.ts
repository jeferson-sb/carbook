import { Router } from 'express';

import CreateRentalController from '../controllers/rental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export default rentalRoutes;
