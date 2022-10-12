import { injectable, singleton } from "tsyringe";
import mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";
import { SessionDocumentI } from "../interfaces/document.interface";

@singleton()
@injectable()
export default class SessionModel implements ModelI {
  schema: mongoose.Schema<any> = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      valid: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    }
  );

  model: mongoose.Model<any, {}> = mongoose.model<SessionDocumentI>(
    "sessions",
    this.schema
  );
}
