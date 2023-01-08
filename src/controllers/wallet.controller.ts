import { autoInjectable } from 'tsyringe';
import WalletService from '../services/wallet.service';
import BaseController from './base.controller';

@autoInjectable()
export default class WalletController extends BaseController {
  constructor(service?: WalletService) {
    super(service!);
  }
}
