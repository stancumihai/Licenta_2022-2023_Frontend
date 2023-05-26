import { ISeenMovieRead } from '../SeenMovie/ISeenMovieRead';

export interface ITopGenreModel {
    genre: string;
    seenMovies: ISeenMovieRead[];
};