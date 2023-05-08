import { IMovie } from '../../Models/IMovie';

export interface INavbarProps {
    areMoviesLoaded: boolean;
    collectAdvancedSearchedMovies: (movies: IMovie[] | null) => void;
    handleRefreshMovies: () => void;
    isAdvancedSearchClosed: boolean | undefined;
};