import { Router } from 'express';
import multer from 'multer';

import CarController from '../controllers/car/CarController';
import CreateCarSpecificationController from '../controllers/car/CreateCarSpecificationController';
import UploadCarImagesController from '../controllers/car/UploadCarImagesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import uploadConfig from '../../../infra/config/upload';

const carsRoutes = Router();

const carController = new CarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, carController.store);
carsRoutes.get('/available', carController.listAvailable);
carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);
carsRoutes.post(
  '/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export default carsRoutes;
