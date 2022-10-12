import mongoose from "mongoose";
import UserDocument from "./document.interface";

export default interface GroupDocument extends mongoose.Document {
  name: string;
  author: UserDocument["id"];
  monthlyDepositAmount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
