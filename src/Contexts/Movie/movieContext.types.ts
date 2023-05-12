import { IMovieContextType } from '../../Enums/movieContextType';
import { IMovie } from '../../Models/IMovie';

export interface IMovieContext {
    movies: IMovie[];
    collectionMovies: IMovie[];
    historyMovies: IMovie[];
    watchLaterMovies: IMovie[];
    setCurrentMovies: (movieContextType: IMovieContextType) => void;
    currentUsedMovies: IMovie[];
};