import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { groupStatus } from '@interfaces/contstants';
import { GroupDocument } from '@interfaces/document.interface';
import { GetGroupInput, groupAddUserInput, MemberInput } from '@schemas/index';
import UserService from '@services/user.service';
import GroupService from '../services/group.service';
import BaseController from './base.controller';

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: GroupService) {
    super(service!);
  }

  viewMembers = async (req: Request<GetGroupInput['params']>, res: Response) => {
    const { groupId } = req.params;

    const allGroupMembers = await this.service.getById<GroupDocument>(groupId, {
      populate: { path: 'members' },
      lean: true,
    });
    return res.status(200).json(allGroupMembers);
  };

  addNewMember = async (
    req: Request<groupAddUserInput['params'], {}, MemberInput['body']>,
    res: Response
  ) => {
    const { groupId } = req.params;
    const newMembersId = req.body.member;
    const group = await this.service.getById<GroupDocument>(groupId);

    if (group && group.status === groupStatus.OPEN) {
      const newMember = await this.service.addToCollection<GroupDocument>(
        groupId,
        { members: newMembersId },
        { new: true, useFindAndModify: false }
      );
      const userService = new UserService();

      await userService.addToCollection<GroupDocument>(
        newMembersId,
        { groups: groupId },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json(newMember);
    }

    return res
      .status(423)
      .json({ message: 'Sorry You can not join this group, this group has been locked by the admin' });
  };

  removeMember = async (req: Request<GetGroupInput['params'], {}, MemberInput['body']>, res: Response) => {
    const { groupId } = req.params;
    const newMembersId = req.body.member;

    const newMember = await this.service.removeFromCollection<GroupDocument>(
      groupId,
      { members: [newMembersId] },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json(newMember);
  };
}
