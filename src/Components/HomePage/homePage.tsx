import {
    acceptedButtonStyles,
    containerClassName,
    dialogStyles,
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
    HOME_PATH,
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
import { CustomDialog } from '../CustomDialog/customDialog';
import { IResponse } from '../../Models/IResponse';

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

    const [refreshMoviesConfirmation, setRefreshMoviesConfirmation] = useState<boolean>(false);
    const [isAdvancedMoviesSpinnerLoading, setIsAdvancedMoviesSpinnerLoading] = useState<boolean>(false);
    const [isAdvancedSearchClosed, setIsAdvancedSearchClosed] = useState<boolean | undefined>(undefined);
    const [loadFromPage, setLoadFromPage] = useState<boolean>(true);
    const [homeMovies, setHomeMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        if (window.location.href !== 'http://localhost:3000/home') {
            const page: string = window.location.href.split('/')[4];
            //handleSidebarClick(page);
            return;
        }
        setPageUrl(window.location.href);
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
        setHomeMovies(movieData.data!.Data!);
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
            const countMapper: ICountMapper = {
                historyCount: historyMovies.length,
                watchLaterCount: watchLaterMovies.length,
                collectionCount: collectionMovies.length
            };
            setCountMapper(countMapper);
        }
    }, [areCollectionMoviesLoaded, areHistoryMoviesLoaded, areWatchLaterMoviesLoaded])

    const onPageChange = (selectedPageIndex: number, loadMoviesFromPage?: boolean): void => {
        if (loadMoviesFromPage === undefined) {
            const url: string = window.location.href;
            if (url === 'http://localhost:3000/home') {
                fetch('https://localhost:7145/api/Movies/' + selectedPageIndex + `/${MAX_MOVIES_PER_PAGE}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setMoviesToDisplayInPage(data);
                    });
                setIsPageEdited(false);
                return;
            }
            if (url.includes('myHistory')) {
                services.MovieService.GetMoviesHistoryPaginated(selectedPageIndex, MAX_MOVIES_PER_PAGE).then(data => {
                    setMoviesToDisplayInPage(data.Data);
                });
                setIsPageEdited(false);
                return;
            }
            services.MovieService.GetMoviesSubscriptionPaginated(selectedPageIndex, MAX_MOVIES_PER_PAGE).then(data => {
                setMoviesToDisplayInPage(data.Data);
            });
            setIsPageEdited(false);
            return;
        }
    };

    const handleSidebarClick = (page: string): void => {
        debugger;
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
                        services.MovieService.GetMoviesCollection().then((data: IResponse<IMovie[]>) => {
                            setMovies(data.Data!)
                        })
                    }, 3000);
                    setTimeout(() => {
                        setAreMoviesLoaded(true);
                    }, 5000);
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
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage(undefined);
                        return;
                    }
                    setTimeout(() => {
                        setMoviesToDisplayInPage(data.Data!);
                        services.MovieService.GetMoviesHistory().then((data: IResponse<IMovie[]>) => {
                            setMovies(data.Data!);
                        });
                    }, 3000);
                    setTimeout(() => {
                        setAreMoviesLoaded(true);
                    }, 5000);
                });
                break;
            }
            case WATCH_LATER_PATH: {
                services.MovieService.GetMoviesSubscriptionPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
                    if (data.Data! === undefined) {
                        setMoviesToDisplayInPage([]);
                        return;
                    }
                    setTimeout(() => {
                        setMoviesToDisplayInPage(data.Data!);
                        services.MovieService.GetMoviesSubscription().then((data: IResponse<IMovie[]>) => {
                            setMovies(data.Data!);
                            console.log(movies);
                        });
                    }, 3000);
                    setTimeout(() => {
                        setAreMoviesLoaded(true);
                    }, 5000);
                });
                break;
            }
            default: {
                setMovies(homeMovies);
                onPageChange(1);
                break;
            }
        }
    };

    const isDataLoaded = (): boolean => {
        return areHistoryMoviesLoaded &&
            areWatchLaterMoviesLoaded &&
            areCollectionMoviesLoaded &&
            areMoviesLoaded
    };

    const collectAdvancedSearchedMovies = (movies: IMovie[] | null): void => {
        if (movies === null) {
            setIsAdvancedMoviesSpinnerLoading(true);
            setIsAdvancedSearchClosed(true);
            return;
        }
        onPageChange(0, true);
        setLoadFromPage(false);
        setIsAdvancedSearchClosed(undefined);
        setMoviesToDisplayInPage(movies!);
        setIsAdvancedMoviesSpinnerLoading(false);
    };

    const handleRefreshMovies = (): void => {
        setRefreshMoviesConfirmation(true);
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        setRefreshMoviesConfirmation(false);
        if (accepted === true) {
            onPageChange(1, undefined);
        }
    };

    return <div className={containerClassName}>
        <Navbar collectAdvancedSearchedMovies={collectAdvancedSearchedMovies}
            handleRefreshMovies={handleRefreshMovies}
            areMoviesLoaded={areMoviesLoaded}
            isAdvancedSearchClosed={isAdvancedSearchClosed}
        />
        {(!isDataLoaded() && moviesToDisplayInPage === undefined) || isAdvancedMoviesSpinnerLoading ?
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
                <SideBar countMapper={countMapper !== undefined ? countMapper : undefined}
                    handleSidebarClick={handleSidebarClick} />
                {areMoviesLoaded && moviesToDisplayInPage !== undefined && <MovieCardsContainer
                    moviesToDisplayInPage={moviesToDisplayInPage !== undefined ? moviesToDisplayInPage : []} />}
                {<CustomDialog dialogStyles={dialogStyles}
                    acceptedButtonStyles={acceptedButtonStyles}
                    mainText={"Are you sure you want to refresh movies?"}
                    isHidden={!refreshMoviesConfirmation}
                    handleCloseDialog={handleCloseDialog}
                    acceptedText="Yes"
                    cancelText='No' />}
                <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                    totalItemsCount={movies.length}
                    onPageChange={onPageChange}
                    loadFromPage={loadFromPage}
                    isPageEdited={isPageEdited} />
            </div>
        }
    </div>
};