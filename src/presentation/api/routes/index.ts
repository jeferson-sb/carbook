import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './user.routes';
import authRoutes from './auth.routes';
import carsRoutes from './car.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/cars', carsRoutes);

export default router;
