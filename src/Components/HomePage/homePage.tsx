import {
    containerClassName,
    loadingSpinnerStyle,
    mainLogoClassName,
    mainLogoDivClassName,
    mainTextClassName
} from './homePage.styles';
import { Navbar } from '../Navbar/navbar';
import { SideBar } from '../SideBar/sideBar';
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
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import {
    MAX_MOVIES_PER_PAGE,
    MY_COLLECTION_PATH,
    MY_HISTORY_PATH,
    SPINNER_LOADING_MOVIES_MESSAGE,
    START_PAGE_INDEX,
    WATCH_LATER_PATH
} from '../../Library/constants';
import { Spinner } from '@fluentui/react';

export const HomePage = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAll());
    const [isPageEdited, setIsPageEdited] = useState<boolean>(false);
    const [moviesToDisplayInPage, setMoviesToDisplayInPage] = useState<IMovie[]>([]);

    useEffect(() => {
        if (window.location.href !== 'http://localhost:3000/home') {
            const page: string = window.location.href.split('/')[4];
            handleSidebarClick(page);
        }
    }, []);

    useEffect(() => {
        if (window.location.href !== 'http://localhost:3000/home') {
            setMoviesToDisplayInPage([]);
            const page: string = window.location.href.split('/')[4];
            setAreMoviesLoaded(false);
            handleSidebarClick(page);
            return;
        }
        if (movieData.isLoading) {
            return;
        }
        if (movieData.errors !== "" ||
            movieData.data?.Error !== undefined ||
            movieData.data == null ||
            movieData.data.Data === undefined) {
            return;
        }
        setIsPageEdited(true);
        setMovies(movieData.data!.Data!);
        setTimeout(() => {
            setAreMoviesLoaded(true);
        }, 2000);
    }, [movieData]);

    const onPageChange = (selectedPageIndex: number): void => {
        fetch('https://localhost:7145/api/Movies/' + selectedPageIndex + `/${MAX_MOVIES_PER_PAGE}`)
            .then((response) => response.json())
            .then((data) => { setMoviesToDisplayInPage(data) });
        setIsPageEdited(false);
    };

    const handleSidebarClick = (page: string): void => {
        setMoviesToDisplayInPage([]);
        switch (page) {
            case MY_COLLECTION_PATH: {
                services.MovieService.GetMoviesCollection(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage([]);
                        return;
                    }
                    setMoviesToDisplayInPage(data.Data!);
                });
                break;
            }
            case MY_HISTORY_PATH: {
                services.MovieService.GetMoviesHistory(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage([]);
                        return;
                    }
                    setMoviesToDisplayInPage(data.Data!);
                });
                break;
            }
            case WATCH_LATER_PATH: {
                services.MovieService.GetMoviesSubscription(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage([]);
                        return;
                    }
                    setMoviesToDisplayInPage(data.Data!);
                });
                break;
            }
            default: {
                console.log('Nothing');
            }
        }
        setTimeout(() => {
            setAreMoviesLoaded(true);
        }, 2000);
    };

    return <div className={containerClassName}>
        <Navbar areMoviesLoaded={areMoviesLoaded} />
        {!areMoviesLoaded ?
            <div>
                <Spinner styles={loadingSpinnerStyle}
                    label={SPINNER_LOADING_MOVIES_MESSAGE}
                    ariaLive="assertive"
                    labelPosition="top" />
            </div> :
            <div>
                <div className={mainLogoDivClassName}>
                    <Logo mainLogoClassName={mainLogoClassName}
                        mainTextClassName={mainTextClassName} />
                </div>
                <SideBar handleSidebarClick={handleSidebarClick} />
                {areMoviesLoaded && <MovieCardsContainer
                    moviesToDisplayInPage={moviesToDisplayInPage} />}
                <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                    totalItemsCount={movies.length}
                    onPageChange={onPageChange}
                    isPageEdited={isPageEdited} />
            </div>
        }
    </div>
};