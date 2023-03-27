import { IMovie } from './IMovie';

export interface IMovieRating {
    uid?: string;
    movie: IMovie;
    averageRating: string;
    votesNumber: number;
};