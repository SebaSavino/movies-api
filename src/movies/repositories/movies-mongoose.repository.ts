import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { BulkResponse, MoviesRepository } from '../movies.types';
import { UpdateMovieDTO } from '../dto/update-movie.dto';
import { CreateMovieDTO } from '../dto/create-movie.dto';
import { Movie } from '../schemas/movie.schema';
import { MoviesMapper } from '../movies.mapper';

@Injectable()
export class MoviesMongooseRepository extends MoviesRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly _movieModel: Model<Movie>,
    private readonly _moviesMapper: MoviesMapper,
  ) {
    super();
  }

  async create(dto: CreateMovieDTO): Promise<Movie> {
    const movie = await this._movieModel.create(dto);
    return this._moviesMapper.toEntity(movie);
  }

  async bulkCreate(dtos: CreateMovieDTO[]): Promise<BulkResponse<Movie>> {
    // const movies = await this._movieModel.insertMany(dtos);
    const promises = dtos.map(async (dto) => this.create(dto));
    const result = await Promise.allSettled(promises);

    const movies = result
      .filter((movie) => movie.status === 'fulfilled')
      .map((movie) => movie.value);

    return {
      count: movies.length,
      items: movies,
    };
  }

  async fetch(): Promise<Movie[]> {
    const movies = await this._movieModel.find({});
    return movies.map(this._moviesMapper.toEntity);
  }

  async fetchByID(movieId: string): Promise<Movie | null> {
    this._validateID(movieId);

    const movie = await this._movieModel.findById(movieId);

    if (!movie) {
      return null;
    }

    return this._moviesMapper.toEntity(movie);
  }

  async updateByID(movieId: string, dto: UpdateMovieDTO): Promise<Movie> {
    this._validateID(movieId);

    const movie = await this._movieModel.findByIdAndUpdate(movieId, dto, {
      new: true,
    });

    if (!movie) {
      return null;
    }

    return this._moviesMapper.toEntity(movie);
  }

  async deleteByID(movieId: string): Promise<boolean> {
    await this.fetchByID(movieId);
    await this._movieModel.deleteOne({ _id: movieId });

    return true;
  }

  private _validateID(movieId: string) {
    if (!isValidObjectId(movieId)) {
      throw new Error(`Invalid ID: ${movieId}`);
    }
  }
}
