import mongoose from "mongoose";
// import { PostI } from "./post.interface";

export interface UserDocumentI extends mongoose.Document {
  id: string;
  emailAddress: string;
  fullName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface SessionDocumentI extends mongoose.Document {
  user: UserDocumentI['_id'];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}