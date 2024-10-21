import * as mongoose from 'mongoose';

import { BulkResponse, MoviesRepository } from '../movies.types';
import { CreateMovieDTO } from '../dto/create-movie.dto';
import { UpdateMovieDTO } from '../dto/update-movie.dto';
import { Movie } from '../schemas/movie.schema';

export class MoviesMockRepository extends MoviesRepository {
  constructor(private readonly _moviesMock: Movie[]) {
    super();
  }

  async fetch(): Promise<Movie[]> {
    return this._moviesMock;
  }

  async create(dto: CreateMovieDTO): Promise<Movie> {
    const movieId = new mongoose.Types.ObjectId().toString();
    const movie = { _id: movieId, ...dto };
    this._moviesMock.push(movie);
    return movie;
  }

  async fetchByID(movieId: string): Promise<Movie | null> {
    return this._moviesMock.find((movie) => movie._id === movieId);
  }

  async bulkCreate(dtos: CreateMovieDTO[]): Promise<BulkResponse<Movie>> {
    const newMovies = dtos.filter((dto) =>
      this._moviesMock.some((movie) => movie.title === dto.title),
    );

    const promises = newMovies.map((movie) => this.create(movie));
    const movies = await Promise.all(promises);

    return {
      count: newMovies.length,
      items: movies,
    };
  }

  async updateByID(
    movieId: string,
    dto: UpdateMovieDTO,
  ): Promise<Movie | null> {
    const movieIndex = this._moviesMock.findIndex(
      (movie) => movie._id === movieId,
    );

    if (movieIndex === -1) {
      return null;
    }

    const movie = {
      ...this._moviesMock[movieIndex],
      ...dto,
    };

    this._moviesMock[movieIndex] = movie;
    return movie;
  }

  async deleteByID(movieId: string): Promise<boolean> {
    this._moviesMock.filter((movie) => movie._id === movieId);
    return this._moviesMock.some((movie) => movie._id === movieId);
  }
}
