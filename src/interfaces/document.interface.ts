import mongoose from 'mongoose';
// import { PostI } from "./post.interface";

export interface UserDocumentI extends mongoose.Document {
  emailAddress: string;
  fullName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
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
  author: UserDocumentI['id'];
  monthlyDepositAmount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
