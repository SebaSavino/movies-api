import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import {
  APIMovie,
  APIResponse,
  APICharacter,
  APIMovieWithCharacters,
} from './swapi.types';

@Injectable()
export class StarWarsAPIService {
  private readonly _characterCache: Map<number, APICharacter> = new Map();
  private readonly _logger = new Logger(StarWarsAPIService.name);

  constructor(private readonly _http: HttpService) {}

  async getMovies(): Promise<APIMovieWithCharacters[]> {
    const { data: movies } = await firstValueFrom(
      this._http.get<APIResponse<APIMovie>>('/films').pipe(
        catchError((error: AxiosError) => {
          this._logger.error(error.response.data);
          throw error.message;
        }),
      ),
    );

    const moviesWithCharacters = await Promise.allSettled(
      movies.results.map(async (movie) => {
        const characters = await this._getCharacters(movie.characters);
        return { ...movie, characters };
      }),
    );

    return moviesWithCharacters.map(
      (promise) => promise.status === 'fulfilled' && promise.value,
    );
  }

  private async _getCharacters(urls: string[]): Promise<APICharacter[]> {
    const characterPromises = urls.map(async (url) => {
      const id = this._extractIdFromUrl(url);
      
      if (this._characterCache.has(id)) {
        return this._characterCache.get(id);
      } else {
        const character = await this._getCharacter(url);
        this._characterCache.set(id, character);
        return character;
      }
    });

    return Promise.all(characterPromises);
  }

  private _extractIdFromUrl(url: string): number {
    const regex = /\/([0-9]+)\//;
    const match = url.match(regex);
    return match ? parseInt(match[1], 10) : -1;
  }

  private async _getCharacter(url: string): Promise<APICharacter> {
    const { data } = await firstValueFrom(
      this._http.get<APICharacter>(url).pipe(
        catchError((error: AxiosError) => {
          this._logger.error(error.response.data);
          throw error.message;
        }),
      ),
    );

    return data;
  }
}
