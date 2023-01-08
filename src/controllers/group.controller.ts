import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { groupStatus } from '@interfaces/contstants';
import { GroupDocument, UserDocumentI } from '@interfaces/document.interface';
import { GetGroupInput, groupAddUserInput, MemberInput, paymentInput } from '@schemas/index';
import UserService from '@services/user.service';
import WalletService from '@services/wallet.service';
import { FLW_PUBLIC_KEY, FLW_SECRET_KEY } from 'src/config';
import { WalletDocumentI } from '../../dist/interfaces/document.interface';
import GroupService from '../services/group.service';
import BaseController from './base.controller';

const Flutterwave = require('flutterwave-node-v3');

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: GroupService) {
    super(service!);
  }

  /**
   * create gruop bank account
   */
  createBankAccount = async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();

    const groupOwner = await userService.getById<UserDocumentI>(req.body.owner);

    const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);
    const payload = {
      phonenumber: groupOwner.phoneNumber,
      firstname: groupOwner.fullName.split(' ')[0],
      lastname: groupOwner.fullName.split(' ')[1],
      email: groupOwner.emailAddress,
      is_permanent: true,
      bvn: Number(groupOwner.bvn),
      tx_ref: `${groupOwner.fullName.split(' ').join('-')}-${groupOwner._id}`,
    };
    try {
      const { data } = await flw.VirtualAcct.create(payload);
      req.body = {
        ...req.body,
        flw_ref: data.flw_ref,
        order_ref: data.order_ref,
        account_number: data.account_number,
        bank_name: data.bank_name,
        expiry_date: data.expiry_date,
      };
      next();
    } catch {
      res.status(400).json({ message: 'Unable to create bank account' });
    }
  };

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

  makePayment = async (req: Request<{}, {}, paymentInput['body']>, res: Response) => {
    const { groupId, userId, amount } = req.body;
    const group = await this.service.getById<GroupDocument>(groupId);

    if (group && group.status === groupStatus.OPEN) {
      await this.service.addToCollection<GroupDocument>(
        groupId,
        { transaction: userId },
        { new: true, useFindAndModify: false }
      );
      const userService = new UserService();
      const walletService = new WalletService();

      const user = await userService.getOne<UserDocumentI>({ _id: userId });

      await userService.updateOne(
        { _id: userId },
        {
          $set: { totalWalletAmount: user.totalWalletAmount + amount },
        },
        { lean: true }
      );

      const wallet = await walletService.getOne<WalletDocumentI>({ group: groupId });
      // eslint-disable-next-line no-console
      console.log({ wallet });
      await walletService.updateOne(
        { _id: wallet._id },
        {
          $set: { amount: wallet.amount + amount },
        },
        { lean: true }
      );
      walletService.addToCollection(
        wallet._id,
        { transactions: userId },
        { new: true, useFindAndModify: false }
      );

      return res.status(201).json({
        message: 'Payment Sucessfull',
      });
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
