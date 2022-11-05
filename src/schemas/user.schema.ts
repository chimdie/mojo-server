import { object, string, TypeOf } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@utils/constants';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    bvn: string({
      required_error: 'BVN is required',
    }),
    phoneNumber: string({
      required_error: 'Phone number is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(PASSWORD_MIN_LENGTH, 'Password is too short'),
    confirmPassword: string({
      required_error: 'Confirm password is required',
    }),
    emailAddress: string({
      required_error: 'Email address is required',
    }).email('Email Address is Not a vaild email address'),
    // ipAddress: string().nullable(),
    // os: string().nullable(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  }),
});

export const verifyBankAccountSchema = object({
  body: object({
    accountNumber: string({
      required_error: 'Account Number is required',
    }),
    bankCode: string({
      required_error: 'Bank code is required',
    }),
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.confirmPassword'>;
export type VerifyBankAccountInput = TypeOf<typeof verifyBankAccountSchema>;
