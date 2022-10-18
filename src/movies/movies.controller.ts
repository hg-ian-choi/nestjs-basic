import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // put same methods which have params after the methods without params
  // otherwise, methods will recognize 'search' as param
  @Get('search')
  search(@Query('year') _year: string): Movie[] {
    return this.moviesService.search(_year);
  }

  @Get('/:id')
  getOne(@Param('id') _movieId: number): Movie {
    return this.moviesService.getOne(_movieId);
  }

  @Post()
  create(@Body() _movieData: CreateMovieDTO): Movie {
    return this.moviesService.create(_movieData);
  }

  @Delete('/:id')
  remove(@Param('id') _movieId: string) {
    return this.moviesService.deleteOne(_movieId);
  }

  @Patch('/:id')
  patch(@Param('id') _movieId: string, @Body() _updateData) {
    return this.moviesService.update(_movieId, _updateData);
  }
}
