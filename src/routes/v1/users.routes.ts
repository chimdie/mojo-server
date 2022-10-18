import { Router } from 'express';
import SessionController from '@controllers/session.controller.';
import UserController from '@controllers/user.controller';
import validate from '@middlewares/validate';
import { createUserSchema, createSessionSchema } from '@schemas/index';

const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionController();

userRouter.get('/', userController.get);
userRouter.post('/signup', validate(createUserSchema), userController.signUp);
userRouter.post('/login', validate(createSessionSchema), sessionController.login);
userRouter.get('/:id', userController.getById);

userRouter.get('/:id/groups', userController.getUserGroups);
// userRouter.patch('/:userId', validate(groupAddUser), userController.addUserToGroup);
userRouter.put('/:id', userController.updateOne);
userRouter.delete('/:id', userController.delete);
export default userRouter;
