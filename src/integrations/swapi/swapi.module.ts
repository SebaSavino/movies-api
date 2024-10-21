import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StarWarsAPIService } from './swapi.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        baseURL: _configService.getOrThrow('STAR_WARS_API_URL'),
      }),
    }),
  ],
  exports: [StarWarsAPIService],
  providers: [StarWarsAPIService],
})
export class StarWarsApiModule {}
