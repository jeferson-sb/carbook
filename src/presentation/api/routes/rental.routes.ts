import { Router } from 'express';

import { refundRentalController } from '../controllers/refund/RefundRentalController';
import { listRentalByUserController } from '../controllers/rental/ListRentalByUserController';
import CreateRentalController from '../controllers/rental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/refund/:id', ensureAuthenticated, refundRentalController);
rentalRoutes.get('/user', ensureAuthenticated, listRentalByUserController);

export default rentalRoutes;
