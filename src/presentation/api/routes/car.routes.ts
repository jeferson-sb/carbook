import { Router } from 'express';

import CarController from '../controllers/car/CarController';
import CreateCarSpecificationController from '../controllers/car/CreateCarSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const carController = new CarController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, carController.store);
carsRoutes.get('/available', carController.listAvailable);
carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);

export default carsRoutes;
