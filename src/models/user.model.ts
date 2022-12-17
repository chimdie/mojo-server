import mongoose from 'mongoose';
import { injectable, singleton } from 'tsyringe';
import { userStatus } from '@interfaces/contstants';
import { UserDocumentI } from '../interfaces/document.interface';
import ModelI from '../interfaces/model.interface';

@singleton()
@injectable()
export default class UserModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      bvn: {
        type: String,
        required: false,
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

      emailAddress: {
        type: String,
        required: true,
      },
      phoneNumber: { type: String, required: false },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: false,
      },
      status: {
        type: String,
        default: userStatus.ACTIVE,
        enum: [userStatus.ACTIVE, userStatus.BANNED],
      },
      groups: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );

  model: mongoose.Model<any, {}> = mongoose.model<UserDocumentI>('User', this.schema);
}
