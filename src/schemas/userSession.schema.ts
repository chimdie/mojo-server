import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    emailAddress: string({ required_error: 'Email is required' }),
    password: string({ required_error: 'Password is required' }),
  }),
});


export type CreateSessionInput = TypeOf<typeof createSessionSchema>