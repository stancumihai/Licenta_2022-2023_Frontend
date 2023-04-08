import { IMovie } from '../IMovie';

export interface ILikedMovieRead {
    uid?: string;
    movie: IMovie;
    userUid: string;
};