import { Router } from 'express';

import AuthenticateUserController from '../controllers/auth/AuthenticateUserController';
import { refreshTokenController } from '../controllers/auth/RefreshTokenController';

const authRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/', authenticateUserController.authenticate);
authRoutes.post('/refresh-token', refreshTokenController);

export default authRoutes;
