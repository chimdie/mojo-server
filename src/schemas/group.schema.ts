import { object, string, number, TypeOf } from 'zod';

const params = {
  params: object({
    groupId: string({
      required_error: 'Group id is required',
    }),
  }),
};
const body = {
  body: object({
    name: string().optional(),
    monthlyDepositAmount: number().optional(),
    owner: string().optional(),
    description: string().optional(),
  }),
};

export const createGroupSchema = object({
  body: object({
    name: string({
      required_error: 'Group Name is required',
    }),
    bankName: string({
      required_error: 'Bank Name is required',
    }),
    bankAccountNumber: string({
      required_error: 'Bank Account is required',
    }),
    monthlyDepositAmount: number({
      required_error: 'Monthly Deposit is required',
    }),
    owner: string({
      required_error: 'Owner id is required',
    }),
    description: string().optional(),
  }),
});

export const getGroup = object({
  ...params,
});

export const updateGroup = object({
  ...params,
  ...body,
});

export const getUserGroups = object({
  params: object({
    id: string({
      required_error: 'Owner id is required',
    }),
  }),
});

export const groupAddUser = object({
  params: object({
    groupId: string({
      required_error: 'group id is required',
    }),
  }),
  body: object({
    member: string({
      required_error: 'user id is required',
    }),
  }),
});

export const addMembersScheam = object({
  body: object({
    member: string({
      required_error: 'user id is required',
    }),
  }),
});
export const payment = object({
  body: object({
    userId: string({
      required_error: 'user id is required',
    }),
    groupId: string({
      required_error: 'group id is required',
    }),
    amount: number({
      required_error: 'amount is required',
    }),
  }),
});

export const wallet = object({
  body: object({
    group: string({
      required_error: 'group is required',
    }),
  }),
});

export type MemberInput = TypeOf<typeof addMembersScheam>;

export type GetGroupInput = TypeOf<typeof getGroup>;
export type updateGroupInput = TypeOf<typeof updateGroup>;
export type userGroupInput = TypeOf<typeof getUserGroups>;
export type groupAddUserInput = TypeOf<typeof groupAddUser>;

export type createBookInput = TypeOf<typeof createGroupSchema>;
export type paymentInput = TypeOf<typeof payment>;
