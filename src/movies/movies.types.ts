import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './schemas/movie.schema';

export abstract class MoviesRepository {
  abstract fetch(): Promise<Movie[]>;
  abstract create(dto: CreateMovieDTO): Promise<Movie>;
  abstract fetchByID(movieId: string): Promise<Movie | null>;
  abstract bulkCreate(dtos: CreateMovieDTO[]): Promise<BulkResponse<Movie>>;
  abstract updateByID(
    movieId: string,
    dto: UpdateMovieDTO,
  ): Promise<Movie | null>;
  abstract deleteByID(movieId: string): Promise<boolean>;
}

export class BulkResponse<T> {
  count: number;
  items: T[];
}
