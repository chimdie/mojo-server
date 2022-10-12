import { autoInjectable } from 'tsyringe';
import { UserDocumentI } from '@interfaces/document.interface';
import UserModel from '@models/user.model';
import BaseService from './base.service';

@autoInjectable()
export default class UserService extends BaseService<UserDocumentI> {
  constructor(modelI?: UserModel) {
    super(modelI!);
  }
}
