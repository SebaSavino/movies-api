import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { filmsWithCharactersMock } from 'src/integrations/swapi/mocks/films-with-characters.mock';
import { MoviesMockRepository } from './repositories/movies-mock.repository';
import { StarWarsAPIService } from 'src/integrations/swapi/swapi.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesRepository } from './movies.types';
import { moviesMock } from './mocks/movies.mock';
import { MoviesService } from './movies.service';
import { MoviesMapper } from './movies.mapper';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MoviesRepository,
          useValue: new MoviesMockRepository(moviesMock),
        },
        {
          provide: StarWarsAPIService,
          useValue: {
            getMovies: jest.fn().mockResolvedValue(filmsWithCharactersMock),
          },
        },
        MoviesMapper,
        MoviesService,
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDTO: CreateMovieDTO = {
        title: 'Test Movie',
        director: 'Test Director',
        producer: 'Test Producer',
        description: 'Test Movie',
        releaseDate: '2024-01-01',
      };

      const result = await service.create(createMovieDTO);

      expect(result).toBeDefined();
      expect(result.title).toEqual(createMovieDTO.title);
      expect(result.director).toEqual(createMovieDTO.director);
    });
  });

  describe('fetch', () => {
    it('should return an array of movies', async () => {
      const result = await service.fetch();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(moviesMock[0]);
    });
  });

  describe('fetchByID', () => {
    it('should return a movie if found', async () => {
      const movie = await service.fetchByID(moviesMock[0]._id);

      expect(movie).toBeDefined();
      expect(movie.title).toEqual(moviesMock[0].title);
    });

    it('should throw NotFoundException if no movie is found', async () => {
      await expect(service.fetchByID('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateByID', () => {
    it('should update a movie', async () => {
      const updateMovieDTO: UpdateMovieDTO = { title: 'Updated Title' };

      const updatedMovie = await service.updateByID(
        moviesMock[0]._id,
        updateMovieDTO,
      );

      expect(updatedMovie).toBeDefined();
      expect(updatedMovie.title).toEqual(updateMovieDTO.title);
    });

    it('should throw NotFoundException if no movie is found', async () => {
      await expect(
        service.updateByID('invalid-id', {} as UpdateMovieDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if there is an error', async () => {
      jest
        .spyOn(repository, 'updateByID')
        .mockRejectedValue(new Error('Test error'));

      await expect(
        service.updateByID('test-id', {} as UpdateMovieDTO),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteByID', () => {
    it('should delete a movie by ID', async () => {
      const result = await service.deleteByID(moviesMock[0]._id);
      expect(result).toBe(true);
    });

    it('should return false if movie is not found', async () => {
      const result = await service.deleteByID('invalid-id');
      expect(result).toBe(false);
    });
  });

  describe('syncDB', () => {
    it('should synchronize the database with StarWars API movies', async () => {
      const result = await service.syncDB();

      expect(result.count).toBeGreaterThan(0);
      expect(result.items.length).toBe(result.count);
    });
  });
});
