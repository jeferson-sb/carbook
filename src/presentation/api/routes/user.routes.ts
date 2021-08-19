import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UserController from '../controllers/user/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const userController = new UserController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', userController.store);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  userController.updateAvatar,
);

export default usersRoutes;
