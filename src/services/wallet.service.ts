import { autoInjectable } from 'tsyringe';
import { WalletDocumentI } from '@interfaces/document.interface';
import WalletModel from '@models/wallet.model';
import BaseService from './base.service';

@autoInjectable()
export default class WalletService extends BaseService<WalletDocumentI> {
  constructor(modelI?: WalletModel) {
    super(modelI!);
  }
}
