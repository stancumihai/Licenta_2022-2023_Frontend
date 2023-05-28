import { IMovieContextType } from '../../Enums/movieContextType';
import { IMovie } from '../../Models/IMovie';
import { IRecommendationRead } from '../../Models/Recommendation/IRecommendationRead';

export interface IMovieContext {
    movies: IMovie[];
    collectionMovies: IMovie[];
    historyMovies: IMovie[];
    watchLaterMovies: IMovie[];
    setCurrentMovies: (movieContextType: IMovieContextType, otherCollection?: IMovie[]) => void;
    currentUsedMovies: IMovie[];
    refreshMovies: boolean;
    setRefreshMoviesState: () => void;
    setRecommendations: (recommendations: IRecommendationRead[]) => void;
    monthlyRecommendations: IRecommendationRead[]
};