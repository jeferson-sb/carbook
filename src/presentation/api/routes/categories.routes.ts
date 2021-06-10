import { Router } from 'express';

import CategoryController from '../controllers/category/CategoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();

categoriesRoutes.post('/', categoryController.store);
categoriesRoutes.get('/', categoryController.findAll);

export default categoriesRoutes;
