import { APIMovieWithCharacters } from '../swapi.types';

export const filmsWithCharactersMock: APIMovieWithCharacters[] = [
  {
    url: 'https://swapi.dev/api/films/1/',
    title: 'A New Hope',
    edited: '2014-12-20T21:17:50.309000Z',
    created: '2014-12-10T14:23:31.880000Z',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    species: ['https://swapi.dev/api/species/1/'],
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
    episode_id: 4,
    starships: ['https://swapi.dev/api/starships/12/'],
    characters: [
      {
        url: 'https://swapi.dev/api/people/1/',
        mass: '77',
        name: 'Luke Skywalker',
        edited: '2014-12-20T21:17:56.891000Z',
        gender: 'male',
        height: '172',
        created: '2014-12-09T13:50:51.644000Z',
        films: ['https://swapi.dev/api/films/1/'],
        homeworld: 'https://swapi.dev/api/planets/1/',
        species: [],
        eye_color: 'blue',
        vehicles: ['https://swapi.dev/api/vehicles/14/'],
        hair_color: 'blond',
        skin_color: 'fair',
        birth_year: '19BBY',
        starships: ['https://swapi.dev/api/starships/12/'],
      },
    ],
    release_date: '1977-05-25',
    opening_crawl: 'It is a period of civil war...',
  },
  {
    url: 'https://swapi.dev/api/films/2/',
    title: 'The Empire Strikes Back',
    edited: '2014-12-20T21:17:50.309000Z',
    created: '2014-12-10T14:23:31.880000Z',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, George Lucas',
    species: ['https://swapi.dev/api/species/2/'],
    vehicles: ['https://swapi.dev/api/vehicles/18/'],
    episode_id: 5,
    starships: ['https://swapi.dev/api/starships/15/'],
    characters: [
      {
        url: 'https://swapi.dev/api/people/2/',
        mass: '112',
        name: 'Darth Vader',
        edited: '2014-12-20T21:17:56.891000Z',
        gender: 'male',
        height: '202',
        created: '2014-12-09T13:50:51.644000Z',
        films: ['https://swapi.dev/api/films/2/'],
        homeworld: 'https://swapi.dev/api/planets/1/',
        species: [],
        eye_color: 'yellow',
        vehicles: [],
        hair_color: 'none',
        skin_color: 'white',
        birth_year: '41.9BBY',
        starships: ['https://swapi.dev/api/starships/13/'],
      },
    ],
    release_date: '1980-05-17',
    opening_crawl: 'It is a dark time for the Rebellion...',
  },
  {
    url: 'https://swapi.dev/api/films/3/',
    title: 'Return of the Jedi',
    edited: '2014-12-20T21:17:50.309000Z',
    created: '2014-12-10T14:23:31.880000Z',
    director: 'Richard Marquand',
    producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
    species: ['https://swapi.dev/api/species/3/'],
    vehicles: ['https://swapi.dev/api/vehicles/16/'],
    episode_id: 6,
    starships: ['https://swapi.dev/api/starships/15/'],
    characters: [
      {
        url: 'https://swapi.dev/api/people/3/',
        mass: '136',
        name: 'Chewbacca',
        edited: '2014-12-20T21:17:56.891000Z',
        gender: 'male',
        height: '228',
        created: '2014-12-09T13:50:51.644000Z',
        films: ['https://swapi.dev/api/films/3/'],
        homeworld: 'https://swapi.dev/api/planets/14/',
        species: ['https://swapi.dev/api/species/3/'],
        eye_color: 'blue',
        vehicles: ['https://swapi.dev/api/vehicles/19/'],
        hair_color: 'brown',
        skin_color: 'unknown',
        birth_year: '200BBY',
        starships: ['https://swapi.dev/api/starships/10/'],
      },
    ],
    release_date: '1983-05-25',
    opening_crawl:
      'Luke Skywalker has returned to his home planet of Tatooine...',
  },
];
