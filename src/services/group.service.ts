import { autoInjectable } from 'tsyringe';
import BookI from '@interfaces/group.interface';
import GroupModel from '@models/group.model';
import BaseService from './base.service';

@autoInjectable()
export default class GroupService extends BaseService<BookI> {
  constructor(modelI?: GroupModel) {
    super(modelI!);
  }
}
