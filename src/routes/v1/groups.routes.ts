import { Router } from 'express';
import GroupController from '@controllers/group.controller';
import validate from '@middlewares/validate';
import { createGroupSchema, getGroup, groupAddUser } from '@schemas/index';

const userRouter = Router();
const groupController = new GroupController();

userRouter.get('/', groupController.get);
userRouter.post('/', validate(createGroupSchema), groupController.post);
userRouter.get('/:id', groupController.getById);
userRouter.get('/:id/members', validate(getGroup), groupController.viewMembers);
userRouter.put('/:id/members', validate(groupAddUser), groupController.addNewMembers);
userRouter.put('/:id', groupController.updateOne);
userRouter.delete('/:id', groupController.delete);

export default userRouter;
