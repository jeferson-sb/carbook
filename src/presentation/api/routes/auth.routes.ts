import { Router } from 'express';

import AuthenticateUserController from '../controllers/auth/AuthenticateUserController';

const authRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/', authenticateUserController.authenticate);

export default authRoutes;
