import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserWithoutPassword } from './users.types';

@Injectable()
export class UsersMapper {
  toUserWithoutPassword(document: UserDocument): UserWithoutPassword {
    return {
      _id: document._id,
      name: document.name,
      email: document.email,
      roles: document.roles,
    };
  }
}
