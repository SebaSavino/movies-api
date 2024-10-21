import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Character {
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  imageUrl?: string;
}

export type CharacterDocument = HydratedDocument<Character>;

export const CharacterSchema = SchemaFactory.createForClass(Character);
