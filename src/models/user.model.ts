import { injectable, singleton } from "tsyringe";
import mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";
import {UserDocumentI} from "../interfaces/document.interface";
import { userStatus } from "@interfaces/contstants";
@singleton()
@injectable()
export default class UserModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId,
      },
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
        defaultTo: userStatus.ACTIVE,
        enum: [userStatus.ACTIVE, userStatus.BANNED],
      },
      groups: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );
  
  model: mongoose.Model<any, {}> = mongoose.model<UserDocumentI>("users", this.schema);
}
