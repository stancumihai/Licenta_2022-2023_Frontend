import { IMovieContextType } from '../../Enums/movieContextType';
import { IMovie } from '../../Models/IMovie';
import { ILikedMovieRead } from '../../Models/LikedMovie/ILikedMovieRead';
import { IMovieSubscriptionRead } from '../../Models/MovieSubscription/IMovieSubscriptionRead';
import { IRecommendationRead } from '../../Models/Recommendation/IRecommendationRead';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';

export interface IMovieContext {
    movies: IMovie[];
    collectionMovies: IMovie[];
    historyMovies: ISeenMovieRead[];
    watchLaterMovies: IMovieSubscriptionRead[];
    setCurrentMovies: (movieContextType: IMovieContextType, otherCollection?: IMovie[]) => void;
    currentUsedMovies: IMovie[];
    refreshMovies: boolean;
    setRefreshMoviesState: () => void;
    setRecommendations: (recommendations: IRecommendationRead[]) => void;
    monthlyRecommendations: IRecommendationRead[],
    likedMovies: ILikedMovieRead[];
    setRefreshWatchLaterMoviesState: () => void;
};