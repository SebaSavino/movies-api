import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { StarWarsAPIService } from 'src/integrations/swapi/swapi.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesRepository } from './movies.types';
import { MoviesMapper } from './movies.mapper';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    private readonly _swapiService: StarWarsAPIService,
    private readonly _repository: MoviesRepository,
    private readonly _moviesMapper: MoviesMapper,
  ) {}

  create(dto: CreateMovieDTO) {
    return this._repository.create(dto);
  }

  fetch() {
    return this._repository.fetch();
  }

  async fetchByID(movieId: string) {
    let movie: Movie;

    try {
      movie = await this._repository.fetchByID(movieId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  async updateByID(movieId: string, dto: UpdateMovieDTO) {
    let movie: Movie;

    try {
      movie = await this._repository.updateByID(movieId, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  deleteByID(movieId: string) {
    return this._repository.deleteByID(movieId);
  }

  async syncDB() {
    const starWarsMovies = await this._swapiService.getMovies();
    const mappedMovies = starWarsMovies.map(this._moviesMapper.fromSWAPI);

    return this._repository.bulkCreate(mappedMovies);
  }
}
