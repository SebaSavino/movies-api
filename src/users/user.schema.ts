import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  REGULAR = 'regular',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty()
  _id?: string;

  @Prop()
  @ApiProperty()
  name?: string;

  @Prop({
    unique: true,
    required: true,
  })
  @ApiProperty()
  email: string;

  @Prop({
    required: true,
  })
  @ApiHideProperty()
  password: string;

  @Prop({
    type: [String],
    enum: UserRole,
    default: [UserRole.REGULAR],
  })
  @ApiProperty()
  roles: UserRole[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
