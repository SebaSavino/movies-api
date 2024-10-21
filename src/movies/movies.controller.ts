import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { UserRole } from 'src/users/user.schema';
import { Movie } from './schemas/movie.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly _service: MoviesService) {}

  @Get('sync')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    description:
      'Obtiene películas de otras fuentes y las sincroniza con la base de datos. </br>' +
      'Solo los <strong>ADMINS</strong> pueden realizar esta tarea.',
  })
  @ApiOkResponse({
    description: 'Películas sincronizadas exitosamente',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'Cantidad de items migrados',
        },
        items: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Movie),
          },
        },
      },
    },
  })
  syncDB() {
    return this._service.syncDB();
  }

  @Get()
  @ApiOperation({
    description: 'Obtiene todas las películas de la base de datos.',
  })
  @ApiOkResponse({ type: [Movie] })
  fetch() {
    return this._service.fetch();
  }

  @Get(':movieId')
  @Roles(UserRole.REGULAR)
  @ApiOperation({
    description: 'Obtiene una peícula en base a su ID de MongoDB.',
  })
  @ApiOkResponse({ type: Movie })
  fetchByID(@Param('movieId') movieId: string) {
    return this._service.fetchByID(movieId);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    description: 'Agrega una nueva película a la base de datos.',
  })
  @ApiCreatedResponse({ type: Movie })
  create(@Body() dto: CreateMovieDTO) {
    return this._service.create(dto);
  }

  @Delete(':movieId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    description:
      'Elimina una película a la base de datos en base a su ID de MongoDB.',
  })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('movieId') movieId: string) {
    this._service.deleteByID(movieId);
  }

  @Patch(':movieId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Actualiza una película en base a su ID de MongoDB.',
  })
  @ApiOkResponse({
    type: Movie,
  })
  update(@Param('movieId') movieId: string, @Body() dto: UpdateMovieDTO) {
    return this._service.updateByID(movieId, dto);
  }
}
