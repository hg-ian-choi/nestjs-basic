import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(_id: string): Movie {
    return this.movies.find((movie) => movie.id === +_id);
  }

  deleteOne(_id: string): boolean {
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
}
