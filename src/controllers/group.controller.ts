import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { GroupDocument } from '@interfaces/document.interface';
import { GetGroupInput, MemberInput } from '@schemas/index';
import GroupService from '../services/group.service';
import BaseController from './base.controller';

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: GroupService) {
    super(service!);
  }

  viewMembers = async (req: Request<GetGroupInput['params']>, res: Response) => {
    const groupId = req.params.id;

    const allGroupMembers = await this.service.getById<GroupDocument>(groupId, {
      populate: { path: 'members' },
      lean: true,
    });

    return res.status(200).json(allGroupMembers);
  };

  addNewMembers = async (req: Request<GetGroupInput['params'], {}, MemberInput['body']>, res: Response) => {
    const groupId = req.params.id;
    const newMembersIds = req.body.member;

    const newMember = await this.service.addToCollection<GroupDocument>(
      groupId,
      { members: newMembersIds },
      { new: false, useFindAndModify: false }
    );
    return res.status(201).json(newMember);
  };
}
