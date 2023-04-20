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
    TRENDING_PATH,
    WATCH_LATER_PATH
} from '../../Library/constants';
import { Spinner } from '@fluentui/react';
import { ICountMapper } from './homePage.types';

export const HomePage = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAll());
    const [isPageEdited, setIsPageEdited] = useState<boolean>(false);
    const [moviesToDisplayInPage, setMoviesToDisplayInPage] = useState<IMovie[] | undefined>(undefined);
    const [pageUrl, setPageUrl] = useState<string>(window.location.href);
    const [countMapper, setCountMapper] = useState<ICountMapper | undefined>(undefined);

    const [collectionMovies, setCollectionMovies] = useState<IMovie[]>([]);
    const [areCollectionMoviesLoaded, setAreCollectionMoviesLoaded] = useState<boolean>(false);
    const colectionMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesCollection());

    const [historyMovies, setHistoryMovies] = useState<IMovie[]>([]);
    const [areHistoryMoviesLoaded, setAreHistoryMoviesLoaded] = useState<boolean>(false);
    const historyMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesHistory());

    const [watchLaterMovies, setWatchLaterMovies] = useState<IMovie[]>([]);
    const [areWatchLaterMoviesLoaded, setAreWatchLaterMoviesLoaded] = useState<boolean>(false);
    const watchLaterMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesSubscription());

    useEffect(() => {
        if (window.location.href !== 'http://localhost:3000/home') {
            const page: string = window.location.href.split('/')[4];
            handleSidebarClick(page);
            return;
        }
        console.log('Page changed');
        setPageUrl(window.location.href);
        onPageChange(1);
    }, [pageUrl]);

    useEffect(() => {
        setMoviesToDisplayInPage(undefined);
        if (window.location.href !== 'http://localhost:3000/home') {
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

    useEffect(() => {
        if (colectionMoviesData.isLoading) {
            return;
        }
        if (colectionMoviesData.errors !== "" ||
            colectionMoviesData.data?.Error !== undefined ||
            colectionMoviesData.data == null ||
            colectionMoviesData.data.Data === undefined) {
            return;
        }
        setCollectionMovies(colectionMoviesData.data!.Data!);
        setTimeout(() => {
            setAreCollectionMoviesLoaded(true);
        }, 2000);
    }, [colectionMoviesData]);

    useEffect(() => {
        if (historyMoviesData.isLoading) {
            return;
        }
        if (historyMoviesData.errors !== "" ||
            historyMoviesData.data?.Error !== undefined ||
            historyMoviesData.data == null ||
            historyMoviesData.data.Data === undefined) {
            return;
        }
        setHistoryMovies(historyMoviesData.data!.Data!);
        setTimeout(() => {
            setAreHistoryMoviesLoaded(true);
        }, 2000);
    }, [historyMoviesData]);

    useEffect(() => {
        if (watchLaterMoviesData.isLoading) {
            return;
        }
        if (watchLaterMoviesData.errors !== "" ||
            watchLaterMoviesData.data?.Error !== undefined ||
            watchLaterMoviesData.data == null ||
            watchLaterMoviesData.data.Data === undefined) {
            return;
        }
        setWatchLaterMovies(watchLaterMoviesData.data!.Data!);
        setTimeout(() => {
            setAreWatchLaterMoviesLoaded(true);
        }, 2000);
    }, [watchLaterMoviesData]);

    useEffect(() => {
        if (areHistoryMoviesLoaded && areWatchLaterMoviesLoaded && areCollectionMoviesLoaded) {
            console.log('they loaded all');

            // const countMapper: ICountMapper = {
            //     historyCount: 1,
            //     watchLaterCount: 2,
            //     collectionCount: 3
            // };
            const countMapper: ICountMapper = {
                historyCount: historyMovies.length,
                watchLaterCount: watchLaterMovies.length,
                collectionCount: collectionMovies.length
            };
            setCountMapper(countMapper);
        }
    }, [areCollectionMoviesLoaded, areHistoryMoviesLoaded, areWatchLaterMoviesLoaded])

    const onPageChange = (selectedPageIndex: number): void => {
        fetch('https://localhost:7145/api/Movies/' + selectedPageIndex + `/${MAX_MOVIES_PER_PAGE}`)
            .then((response) => response.json())
            .then((data) => { setMoviesToDisplayInPage(data) });
        setIsPageEdited(false);
    };

    const handleSidebarClick = (page: string): void => {
        setMoviesToDisplayInPage(undefined);
        switch (page) {
            case MY_COLLECTION_PATH: {
                services.MovieService.GetMoviesCollectionPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage(undefined);
                        return;
                    }
                    setTimeout(() => {
                        setMoviesToDisplayInPage(data.Data!);
                    }, 1000);
                    setTimeout(() => {
                        debugger;
                        setAreMoviesLoaded(true);
                    }, 2000);
                });
                break;
            }
            case TRENDING_PATH: {
                setTimeout(() => {
                    setMoviesToDisplayInPage(undefined);
                    setAreMoviesLoaded(true);
                }, 1000);
                break;
            }
            case MY_HISTORY_PATH: {
                services.MovieService.GetMoviesHistoryPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    console.log(data);
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage(undefined);
                        return;
                    }
                    setTimeout(() => {
                        setMoviesToDisplayInPage(data.Data!);
                    }, 1000);
                    setTimeout(() => {
                        setAreMoviesLoaded(true);
                    }, 2000);
                });
                break;
            }
            case WATCH_LATER_PATH: {
                services.MovieService.GetMoviesSubscriptionPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    console.log(data);
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage([]);
                        return;
                    }
                    setTimeout(() => {
                        setMoviesToDisplayInPage(data.Data!);
                        setAreMoviesLoaded(true);
                    }, 1000);
                });
                break;
            }
            default: {
                console.log('Nothing');
            }
        }
    };

    const isDataLoaded = (): boolean => {
        return areHistoryMoviesLoaded && areWatchLaterMoviesLoaded && areCollectionMoviesLoaded && areMoviesLoaded
    };

    return <div className={containerClassName}>
        <Navbar areMoviesLoaded={areMoviesLoaded} />
        {!isDataLoaded() && moviesToDisplayInPage === undefined ?
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
                <SideBar countMapper={countMapper !== undefined ? countMapper : undefined} handleSidebarClick={handleSidebarClick} />
                {areMoviesLoaded && moviesToDisplayInPage !== undefined && <MovieCardsContainer
                    moviesToDisplayInPage={moviesToDisplayInPage !== undefined ? moviesToDisplayInPage : []} />}
                <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                    totalItemsCount={movies.length}
                    onPageChange={onPageChange}
                    isPageEdited={isPageEdited} />
            </div>
        }
    </div>
};