import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') _id: string): string {
    return `This will return one movie with the id: ${_id}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') _id: string) {
    return `This will delete a movie with the id: ${_id}`;
  }

  @Patch('/:id')
  patch(@Param('id') _id: string) {
    return `This will patch a movie with the id: ${_id}`;
  }
}
