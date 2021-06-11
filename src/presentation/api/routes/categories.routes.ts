import { Router } from 'express';
import multer from 'multer';

import CategoryController from '../controllers/category/CategoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', categoryController.store);
categoriesRoutes.get('/', categoryController.findAll);
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  categoryController.import,
);

export default categoriesRoutes;
