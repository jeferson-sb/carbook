import { Router } from 'express';

import AuthenticateUserController from '../controllers/auth/AuthenticateUserController';
import { refreshTokenController } from '../controllers/auth/RefreshTokenController';
import { sendForgotPasswordMailController } from '../controllers/auth/SendForgotPasswordMailController';

const authRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/', authenticateUserController.authenticate);
authRoutes.post('/refresh-token', refreshTokenController);
authRoutes.post('/forgot', sendForgotPasswordMailController);

export default authRoutes;
