import mongoose from 'mongoose';
import { injectable, singleton } from 'tsyringe';
import { WalletDocumentI } from '../interfaces/document.interface';
import ModelI from '../interfaces/model.interface';

@singleton()
@injectable()
export default class WalletModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      amount: { type: Number, default: 0 },
      transactions: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    },
    {
      timestamps: true,
    }
  );

  model: mongoose.Model<any, {}> = mongoose.model<WalletDocumentI>('Wallet', this.schema);
}
