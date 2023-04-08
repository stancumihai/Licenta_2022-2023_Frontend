import { IMovie } from '../IMovie';

export interface ISeenMovieRead {
    uid?: string;
    movie: IMovie;
    userUid: string;
};