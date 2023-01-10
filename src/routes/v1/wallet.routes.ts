import { Router } from 'express';
import WalletController from '@controllers/wallet.controller';
import validate from '@middlewares/validate';
import { wallet } from '@schemas/index';

const walletRouter = Router();
const walletController = new WalletController();

walletRouter.get('/', walletController.get);
walletRouter.post('/', validate(wallet), walletController.post);
walletRouter.get('/group', validate(wallet), walletController.getGroupWallet);
walletRouter.get('/:id', walletController.getById);
walletRouter.put('/:id', walletController.findOneAndUpdate);
walletRouter.delete('/:id', walletController.delete);

export default walletRouter;
