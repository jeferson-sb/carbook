import { Router } from 'express';

import CarController from '../controllers/car/CarController';

const carsRoutes = Router();
const carController = new CarController();

carsRoutes.post('/', carController.store);

export default carsRoutes;
