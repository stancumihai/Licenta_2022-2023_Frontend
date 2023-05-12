import { IMovie } from '../../Models/IMovie';

export interface IAdvancedSearchProps {
    handleCloseDialog: () => void,
    isOpen: boolean,
    //collectAdvancedSearchedMovies: (movies: IMovie[] | null) => void;
};