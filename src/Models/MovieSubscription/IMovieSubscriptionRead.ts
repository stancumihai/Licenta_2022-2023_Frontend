import { IMovie } from '../IMovie';

export interface IMovieSubscriptionRead {
    uid?: string;
    movie: IMovie;
    userUid: string;
};