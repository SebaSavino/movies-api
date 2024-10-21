import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

// import { Character } from './character.schema';

@Schema({
  timestamps: true,
})
export class Movie {
  @ApiProperty({
    description: 'MongoDB ID',
    uniqueItems: true,
  })
  _id?: string;

  @Prop({
    required: true,
    unique: true,
  })
  @ApiProperty({
    example: 'Harry Potter y La Piedra Filosal',
    uniqueItems: true,
  })
  title: string;

  @Prop()
  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl?: string;

  @Prop({
    required: true,
  })
  @ApiProperty({
    example: 'Harry encuentra una piedra que extiende la vida',
  })
  description: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  director: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  producer: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  releaseDate: string;

  // @Prop({
  //   type: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Character',
  //     },
  //   ],
  //   default: [],
  // })
  // characters: Character[];
}

export type MovieDocument = mongoose.HydratedDocument<Movie>;

export const MovieSchema = SchemaFactory.createForClass(Movie);
