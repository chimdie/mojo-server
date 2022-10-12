import { autoInjectable } from 'tsyringe';
import GroupService from '../services/group.service';
import BaseController from './base.controller';

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: GroupService) {
    super(service!);
  }
}
