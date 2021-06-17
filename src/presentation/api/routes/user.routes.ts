import { Router } from 'express';
import multer from 'multer';

import UserController from '../controllers/user/UserController';
import uploadConfig from '../../../infra/config/upload';
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
