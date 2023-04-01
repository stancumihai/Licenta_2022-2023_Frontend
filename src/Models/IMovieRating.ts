import { IMovie } from './IMovie';

export interface IMovieRating {
    uid?: string;
    movie: IMovie;
    averageRating: number;
    votesNumber: number;
};