import {
    containerClassName,
    mainLogoClassName,
    mainLogoDivClassName,
    mainTextClassName
} from './homePage.styles';
import { Logo } from '../Logo/logo';
import { MovieCardsContainer } from '../MovieCardsContainer/movieCardsContainer';
import { Paginator } from '../Paginator/paginator';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { IMovie } from '../../Models/IMovie';
import {
    MAX_MOVIES_PER_PAGE
} from '../../Library/constants';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import MovieContext from '../../Contexts/Movie/movieContext';
import { useParams } from 'react-router-dom';
import { IMovieContextType } from '../../Enums/movieContextType';

export const HomePage = (): JSX.Element => {
    const { sideBarPage } = useParams();
    const movieContext: IMovieContext = useContext(MovieContext);
    const [moviesToDisplayInPage, setMoviesToDisplayInPage] = useState<IMovie[] | undefined>([]);
    const [shouldResetPaginator, setShouldResetPaginator] = useState<boolean>(false);

    useEffect(() => {
        setShouldResetPaginator(prev => !prev);
        switch (sideBarPage) {
            case 'myCollection':
                movieContext.setCurrentMovies(IMovieContextType.COLLECTION);
                return;
            case 'trending':
                movieContext.setCurrentMovies(IMovieContextType.NONE);
                return;
            case 'myHistory':
                movieContext.setCurrentMovies(IMovieContextType.HISTORY);
                return;
            case 'watchLater':
                movieContext.setCurrentMovies(IMovieContextType.WATCHLATER);
                return;
            default:
                movieContext.setCurrentMovies(IMovieContextType.HOME);
        }
    }, [sideBarPage]);

    useEffect(() => {
        onPageChange(1);
    }, [movieContext.currentUsedMovies])

    const onPageChange = (selectedPageIndex: number): void => {
        setMoviesToDisplayInPage(movieContext.currentUsedMovies
            .slice((selectedPageIndex - 1) * MAX_MOVIES_PER_PAGE,
                selectedPageIndex * MAX_MOVIES_PER_PAGE));
    };

    return <div className={containerClassName}>
        <div>
            <div className={mainLogoDivClassName}>
                <Logo mainLogoClassName={mainLogoClassName}
                    mainTextClassName={mainTextClassName} />
            </div>
            <MovieCardsContainer moviesToDisplayInPage={moviesToDisplayInPage !== undefined ? moviesToDisplayInPage : []} />
            <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                totalItemsCount={movieContext.currentUsedMovies.length}
                onPageChange={onPageChange}
                shouldReset={shouldResetPaginator}
            />
        </div>
    </div>
};