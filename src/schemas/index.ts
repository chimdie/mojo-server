import { type } from "os";
import {
  ReadBookInput,
  createBookInput,
  getGroup,
  updateGroup,
  updateBookInput,
  createGroupSchema,
  groupAddUser,
} from "./group.schema";
import { CreateUserInput, createUserSchema } from "./user.schema";

export type {
  ReadBookInput,
  updateBookInput,
  createBookInput,
  CreateUserInput,
};

export {
  getGroup,
  createGroupSchema,
  createUserSchema,
  updateGroup,
  groupAddUser,
};
