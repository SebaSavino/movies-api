import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StarWarsApiModule } from 'src/integrations/swapi/swapi.module';
import { MoviesMongooseRepository } from './repositories/movies-mongoose.repository';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.types';
import { MoviesService } from './movies.service';
import { MoviesMapper } from './movies.mapper';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  imports: [
    StarWarsApiModule,
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: MoviesRepository,
      useClass: MoviesMongooseRepository,
    },
    MoviesMapper,
    MoviesService,
  ],
  controllers: [MoviesController],
})
export class MoviesModule {}
