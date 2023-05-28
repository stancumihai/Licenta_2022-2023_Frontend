import { IMovie } from '../IMovie';

export interface IRecommendationRead {
    uid?: string;
    movie: IMovie;
    userUid: string;
    createdAt: Date;
    likedDecisionDate: Date;
    isLiked: boolean;
};