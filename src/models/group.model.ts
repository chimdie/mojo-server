import { injectable, singleton } from "tsyringe";
import mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";
import BookI from "../interfaces/group.interface";
import { groupStatus } from "@interfaces/contstants";

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
  model: mongoose.Model<any, {}> = mongoose.model<BookI>("Group", this.schema);
}
