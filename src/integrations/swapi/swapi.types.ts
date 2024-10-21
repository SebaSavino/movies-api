export interface APIResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export type APIMovieWithCharacters = Omit<APIMovie, 'characters'> & {
  characters: APICharacter[];
};

export interface APIMovie {
  url: string;
  title: string;
  edited: string;
  created: string;
  director: string;
  producer: string;
  species: string[];
  vehicles: string[];
  episode_id: number;
  starships: string[];
  characters: string[];
  release_date: string;
  opening_crawl: string;
}

export interface APICharacter {
  url: string;
  mass: string;
  name: string;
  edited: string;
  gender: string;
  height: string;
  created: string;
  films: string[];
  homeworld: string;
  species: string[];
  eye_color: string;
  vehicles: string[];
  hair_color: string;
  skin_color: string;
  birth_year: string;
  starships: string[];
}
