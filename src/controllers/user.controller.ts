import { Request, Response } from 'express';
import { hash } from 'argon2';
import { autoInjectable } from 'tsyringe';
import { GroupDocument } from '@interfaces/index';
import { userGroupInput } from '@schemas/group.schema';
import { CreateUserInput, VerifyBankAccountInput } from '@schemas/index';
import { FLW_PUBLIC_KEY, FLW_SECRET_KEY } from 'src/config';
import GroupService from '../services/group.service';
import UserService from '../services/user.service';
import BaseController from './base.controller';

const Flutterwave = require('flutterwave-node-v3');

@autoInjectable()
export default class UserController extends BaseController {
  flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);

  constructor(service?: UserService) {
    super(service!);
  }

  getUserGroups = async (req: Request<userGroupInput['params']>, res: Response) => {
    try {
      const group = new GroupService();
      const userGroups = await group.get<GroupDocument>({ owner: req.params.id });

      return res.status(200).json(userGroups);
    } catch (e) {
      return res.status(500).send({ message: 'server error' });
    }
  };

  signUp = async (req: Request<CreateUserInput['body']>, res: Response) => {
    const user = req.body;
    const fullName = `${user.lastName} ${user.firstName}`;
    const { password } = req.body;
    const hashedPassword = await hash(password);

    const newUser = await this.service.post({
      ...user,
      fullName,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  };

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.service.get(
      {},
      {
        populate: { path: 'groups' },
        // lean: true,
      }
    );
    return res.status(201).json(users);
  };

  verifyAccountNumber = async (req: Request<VerifyBankAccountInput['body']>, res: Response) => {
    const details = {
      account_number: req.body.accountNumber,
      account_bank: req.body.bankCode,
    };
    // eslint-disable-next-line no-console
    console.log({ details });

    this.flw.Misc.verify_Account(details)
      .then((response: any) => {
        return res.status(201).json(response);
      })
      .catch((err: any) => {
        return res.status(500).json({
          message: err.response.message,
          success: false,
        });
      });
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
