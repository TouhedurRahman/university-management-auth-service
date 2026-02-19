import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student/',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createStudent
);

export const UserRoutes = router;
