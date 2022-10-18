import { Router } from 'express';
import GroupController from '@controllers/group.controller';
import validate from '@middlewares/validate';
import { createGroupSchema, getGroup, groupAddUser } from '@schemas/index';

const userRouter = Router();
const groupController = new GroupController();

userRouter.get('/', groupController.get);
userRouter.post('/', validate(createGroupSchema), groupController.post);
userRouter.get('/:id', groupController.getById);

// get all group members
userRouter.get('/:groupId/members', validate(getGroup), groupController.viewMembers);

// add a new member to the group
userRouter.put('/:groupId/members', validate(groupAddUser), groupController.addNewMember);
userRouter.put('/:id', groupController.findOneAndUpdate);
userRouter.delete('/:id', groupController.delete);
userRouter.delete('/:groupId/members', groupController.removeMember);

export default userRouter;
