import mongoose from 'mongoose';
// import { PostI } from "./post.interface";

export interface UserDocumentI extends mongoose.Document {
  emailAddress: string;
  fullName: string;
  bvn: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  totalWalletAmount: number;
  comparePassword(password: string): Promise<boolean>;
}
export interface SessionDocumentI extends mongoose.Document {
  user: UserDocumentI['id'];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupDocument extends mongoose.Document {
  name: string;
  owner: UserDocumentI['id'];
  status: string;
  isPrivate: boolean;
  monthlyDepositAmount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface WalletDocumentI extends mongoose.Document {
  amount: string;
  transaction: string;
  group: GroupDocument['id'];
}
