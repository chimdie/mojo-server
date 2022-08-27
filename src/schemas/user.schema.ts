import { object, string, TypeOf } from "zod";
import { PASSWORD_MIN_LENGTH } from "@utils/constants";

export const createUserSchema = object({
  body: object({
    fullName: string({
      required_error: "Full name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(PASSWORD_MIN_LENGTH, "Password is too short"),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
    emailAddress: string({
      required_error: "Email address is required",
    }).email("Email Address is Not a vaild email address"),
    // ipAddress: string().nullable(),
    // os: string().nullable(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.confirmPassword"
>;
