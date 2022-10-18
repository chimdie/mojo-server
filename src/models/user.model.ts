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
      emailAddress: {
        type: String,
        required: true,
      },
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
