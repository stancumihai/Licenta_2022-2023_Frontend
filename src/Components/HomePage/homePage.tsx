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
import { PAGES } from './homePage.types';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';

export const HomePage = (): JSX.Element => {
    const { sideBarPage } = useParams();
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const movieContext: IMovieContext = useContext(MovieContext);
    const [moviesToDisplayInPage, setMoviesToDisplayInPage] = useState<IMovie[] | undefined>([]);
    const [shouldResetPaginator, setShouldResetPaginator] = useState<boolean>(false);

    useEffect(() => {
        handlePageRedirection();
    }, []);

    const waitForUser = () => {
        if (authenticationContext.User.email === "") {
            setTimeout(() => {
                waitForUser();
            }, 200);
            return;
        }
    };

    useEffect(() => {
        waitForUser();
        const userRecommendations = movieContext.monthlyRecommendations.filter(f => f.userUid === authenticationContext.User.uid);
        movieContext.setRecommendations(userRecommendations);
    }, []);

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
            case 'recommendations': {
                movieContext.setCurrentMovies(IMovieContextType.RECOMMENDATIONS);
                return;
            }
            default:
                movieContext.setCurrentMovies(IMovieContextType.HOME);
        }
    }, [sideBarPage]);

    useEffect(() => {
        onPageChange(1);
    }, [movieContext.currentUsedMovies]);

    const handlePageRedirection = () => {
        if (window.location.href !== 'http://localhost:3000/home') {
            if (sideBarPage === undefined) {
                window.location.href = 'http://localhost:3000/home';
                return
            }
            for (let i = 0; i < PAGES.length; i++) {
                if (PAGES[i].includes(sideBarPage)) {
                    return;
                }
            }
            window.location.href = 'http://localhost:3000/home';
        }
    };

    const onPageChange = (selectedPageIndex: number): void => {
        setMoviesToDisplayInPage(movieContext.currentUsedMovies
            .slice((selectedPageIndex - 1) * MAX_MOVIES_PER_PAGE,
                selectedPageIndex * MAX_MOVIES_PER_PAGE));
    };

    return <div className={containerClassName}>
        <div className={mainLogoDivClassName}>
            <Logo mainLogoClassName={mainLogoClassName}
                mainTextClassName={mainTextClassName} />
        </div>
        <MovieCardsContainer moviesToDisplayInPage={moviesToDisplayInPage !== undefined ? moviesToDisplayInPage : []} />
        <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
            totalItemsCount={movieContext.currentUsedMovies.length}
            onPageChange={onPageChange}
            shouldReset={shouldResetPaginator} />
    </div>
};