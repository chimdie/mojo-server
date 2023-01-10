import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { WalletDocumentI } from '@interfaces/document.interface';
import { walletInput } from '@schemas/group.schema';
import WalletService from '../services/wallet.service';
import BaseController from './base.controller';

@autoInjectable()
export default class WalletController extends BaseController {
  constructor(service?: WalletService) {
    super(service!);
  }

  getGroupWallet = async (req: Request<{}, {}, walletInput['body']>, res: Response) => {
    try {
      // eslint-disable-next-line no-console
      console.log({ req: req.body.group });
      const wallet = await this.service.getOne<WalletDocumentI>({ group: req.body.group });
      // eslint-disable-next-line no-console
      console.log({ wallet });
      return res.status(200).json(wallet);
    } catch (e) {
      return res.status(500).send({ message: 'server error' });
    }
  };
}
