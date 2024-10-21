import { User } from './user.schema';

export type UserWithoutPassword = Omit<User, 'password'>;
