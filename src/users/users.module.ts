import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { UsersMapper } from './users.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersMapper, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
