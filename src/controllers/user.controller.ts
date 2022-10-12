import { Request, Response } from 'express';
import { hash } from 'argon2';
import { autoInjectable } from 'tsyringe';
import { userGroupInput, groupAddUserInput } from '@schemas/group.schema';
import { CreateUserInput } from '@schemas/index';
import GroupService from '../services/group.service';
import UserService from '../services/user.service';
import BaseController from './base.controller';

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: UserService) {
    super(service!);
  }

  getUserGroups = async (req: Request<userGroupInput['params']>, res: Response) => {
    try {
      const group = new GroupService();
      const userGroups = await group.get({ owner: req.params.id });

      res.status(200).json(userGroups);
    } catch (e) {
      return res.status(500).send({ message: 'server error' });
    }
  };

  addUserToGroup = async (
    req: Request<groupAddUserInput['params'], {}, groupAddUserInput['body']>,
    res: Response
  ) => {
    try {
      const { userId } = req.params;

      await this.service.findOneAndUpdate({ id: userId }, { $push: { groups: req.body.group } });
    } catch (e) {
      return res.status(500).send({ message: 'server error' });
    }
  };

  signUp = async (req: Request<CreateUserInput['body']>, res: Response) => {
    const user = req.body;
    const { password } = req.body;
    const hashedPassword = await hash(password);

    const newUser = await this.service.post({
      ...user,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  };

  // deleteUser = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   try {
  //     // const resource = await this.service.delete(id);
  //     const
  //     res.send(resource);
  //   } catch (error: any) {
  //     return res.status(500).send({ message: "server error" });
  //   }
  // };
}
