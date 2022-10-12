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
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId,
      },
      name: {
        type: String,
        required: true,
      },
      monthlyDepositAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        defaultTo: groupStatus.OPEN,
        enum: [groupStatus.OPEN, groupStatus.CLOSED],
      },
      isPrivate: {
        type: Boolean,
        defaultTo: false,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
    },
    {
      timestamps: true,
    }
  );

  model: mongoose.Model<any, {}> = mongoose.model<GroupDocument>('Group', this.schema);
}
