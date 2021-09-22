import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UserController from '../controllers/user/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { showUserProfileController } from '../controllers/user/ShowUserProfileController';

const usersRoutes = Router();
const userController = new UserController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post('/', userController.store);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  userController.updateAvatar,
);

usersRoutes.get('/', ensureAuthenticated, showUserProfileController);

export default usersRoutes;
