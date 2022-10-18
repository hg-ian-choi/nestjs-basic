import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(_id: string): Movie {
    const movie: Movie = this.movies.find((movie) => movie.id === +_id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${_id} not found`);
    }
    return movie;
  }

  search(_year: string): Movie[] {
    return this.movies.filter((movie) => movie.year === +_year);
  }

  deleteOne(_id: string): boolean {
    this.getOne(_id);
    const length: number = this.movies.length;
    this.movies = this.movies.filter((movie) => movie.id !== +_id);
    return length - this.movies.length === 1 ? true : false;
  }

  create(_movie: Movie): Movie {
    const newId = this.movies.length + 1;
    this.movies.push({
      id: newId,
      ..._movie,
    });
    return this.movies[newId - 1];
  }

  update(_id: string, _movie: Movie): Movie {
    this.getOne(_id);
    this.movies[+_id - 1] = {
      id: +_id,
      ..._movie,
    };
    return this.getOne(_id);
  }
}
