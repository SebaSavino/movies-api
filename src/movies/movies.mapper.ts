import { Injectable } from '@nestjs/common';

import { APIMovieWithCharacters } from 'src/integrations/swapi/swapi.types';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesMapper {
  toEntity(document: MovieDocument): Movie {
    return {
      _id: document._id,
      title: document.title,
      director: document.director,
      producer: document.producer,
      releaseDate: document.releaseDate,
      description: document.description,
    };
  }

  fromSWAPI(movie: APIMovieWithCharacters): Movie {
    return {
      title: movie.title,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.release_date,
      description: movie.opening_crawl,
      // characters: movie.characters.map((character) => ({
      //   name: character.name,
      // })),
    };
  }
}
