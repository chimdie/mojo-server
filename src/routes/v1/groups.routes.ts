import { Router } from 'express';
import GroupController from '@controllers/group.controller';
import validate from '@middlewares/validate';
import { createGroupSchema, getGroup, groupAddUser, payment } from '@schemas/index';

const groupRouter = Router();
const groupController = new GroupController();

groupRouter.get('/', groupController.get);
groupRouter.post('/', validate(createGroupSchema), groupController.post);
groupRouter.get('/:id', groupController.getById);

// get all group members
groupRouter.get('/:groupId/members', validate(getGroup), groupController.viewMembers);

// add a new member to the group
groupRouter.put('/:groupId/members', validate(groupAddUser), groupController.addNewMember);
groupRouter.put('/:id', groupController.findOneAndUpdate);
groupRouter.delete('/:id', groupController.delete);
groupRouter.delete('/:groupId/members', groupController.removeMember);

// payment
groupRouter.post('/payment', validate(payment), groupController.makePayment);
export default groupRouter;
