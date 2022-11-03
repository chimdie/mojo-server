import mongoose from 'mongoose';
import { injectable, singleton } from 'tsyringe';
import { groupStatus } from '@interfaces/contstants';
import { GroupDocument } from '../interfaces/document.interface';
import ModelI from '../interfaces/model.interface';

@singleton()
@injectable()
export default class GroupModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      flw_ref: {
        type: String,
        // required: true,
      },
      order_ref: {
        type: String,
        required: true,
      },
      account_number: {
        type: String,
        required: true,
      },
      bank_name: {
        type: String,
        required: true,
      },
      expiry_date: {
        type: String,
      },

      monthlyDepositAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: groupStatus.OPEN,
        enum: [groupStatus.OPEN, groupStatus.CLOSED],
      },
      isPrivate: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      members: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );

  model: mongoose.Model<any, {}> = mongoose.model<GroupDocument>('Group', this.schema);
}
