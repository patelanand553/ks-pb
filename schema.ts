import { createSchema } from '@keystone-next/keystone/schema';

// importing schemas
import { userSchema } from './schemas/user';
import { problemSchema } from './schemas/problem';
import { problemTagSchema } from './schemas/problemTag';

export const lists = createSchema({
  User: userSchema,
  Problem: problemSchema ,
  ProblemTag: problemTagSchema,
});
