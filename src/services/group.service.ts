import { GroupDocument } from '@interfaces/document.interface';
import { autoInjectable } from 'tsyringe';
import GroupModel from '@models/group.model';
import BaseService from './base.service';

@autoInjectable()
export default class GroupService extends BaseService<GroupDocument> {
  constructor(modelI?: GroupModel) {
    super(modelI!);
  }
}
