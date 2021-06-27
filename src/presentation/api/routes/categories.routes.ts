import { Router } from 'express';
import multer from 'multer';

import CategoryController from '../controllers/category/CategoryController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();
const categoryController = new CategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  categoryController.store,
);
categoriesRoutes.get('/', categoryController.findAll);
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  categoryController.import,
);

export default categoriesRoutes;
