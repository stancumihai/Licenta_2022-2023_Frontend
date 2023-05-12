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
import {
    DASHBOARD_PATH,
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
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { Dashboard } from '../Dashboard/dashboard';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import MovieContext from '../../Contexts/Movie/movieContext';

export const HomePage = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const movieContext: IMovieContext = useContext(MovieContext);

    const [isPageEdited, setIsPageEdited] = useState<boolean>(false);
    const [moviesToDisplayInPage, setMoviesToDisplayInPage] = useState<IMovie[] | undefined>(undefined);
    const [pageUrl, setPageUrl] = useState<string>(window.location.href);
    const [countMapper, setCountMapper] = useState<ICountMapper | undefined>(undefined);
    const [refreshMoviesConfirmation, setRefreshMoviesConfirmation] = useState<boolean>(false);
    const [isAdvancedMoviesSpinnerLoading, setIsAdvancedMoviesSpinnerLoading] = useState<boolean>(false);
    const [isAdvancedSearchClosed, setIsAdvancedSearchClosed] = useState<boolean | undefined>(undefined);
    const [loadFromPage, setLoadFromPage] = useState<boolean>(true);
    const [homeMovies, setHomeMovies] = useState<IMovie[]>([]);
    const [previousUrl, setPreviousUrl] = useState<string>('');
    const [searchBoxText, setSearchBoxText] = useState<string | undefined>(undefined);
    const [isDashboardPageClicked, setIsDashboardPageClicked] = useState<boolean>(false);
    const [isSidebarClicked, setIsSidebarClicked] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const onPageChange = (selectedPageIndex: number, sentFromSearch: boolean, loadMoviesFromPage?: boolean): void => {
        const pageMovies = movieContext.currentUsedMovies
            .slice(selectedPageIndex * MAX_MOVIES_PER_PAGE, (selectedPageIndex + 1) * MAX_MOVIES_PER_PAGE);
        setMoviesToDisplayInPage(pageMovies);
        // if (sentFromSearch === true) {
        //     if (searchBoxText === undefined) {
        //         setTimeout(() => {
        //             onPageChange(selectedPageIndex, sentFromSearch, loadMoviesFromPage);
        //             return;
        //         }, 1000);
        //         console.log('asd ' + searchBoxText);
        //         return;
        //     }
        //     setSearchBoxText(undefined);
        //     const searchedMovies: IMovie[] = homeMovies.filter((m: IMovie) => m.title.includes(searchBoxText));
        //     setMovies(searchedMovies);
        //     setMoviesToDisplayInPage(searchedMovies.slice(0, 8));
        //     setIsPageEdited(false);
        //     return;
        // }
        if (isDashboardPageClicked) {
            navigate(DASHBOARD_PATH);
            return;
        }
        const currentUrl: string = window.location.href;
        // if (loadMoviesFromPage === undefined) {
        // if (currentUrl === 'http://localhost:3000/home') {
        //     fetch('https://localhost:7145/api/Movies/' + selectedPageIndex + `/${MAX_MOVIES_PER_PAGE}`)
        //         .then((response) => response.json())
        //         .then((data) => {
        //             setMoviesToDisplayInPage(data);
        //         });
        //     setIsPageEdited(false);
        //     return;
        // }
        //     if (currentUrl !== previousUrl) {
        //         selectedPageIndex = 1;
        //         setPreviousUrl(currentUrl);
        //         setIsPageEdited(true);
        //     }
        //     if (currentUrl.includes(MY_HISTORY_PATH)) {
        //         services.MovieService.GetMoviesHistoryPaginated(selectedPageIndex, MAX_MOVIES_PER_PAGE).then(data => {
        //             setMoviesToDisplayInPage(data.Data);
        //         });
        //         setIsPageEdited(false);
        //         return;
        //     }
        //     if (currentUrl.includes(MY_COLLECTION_PATH)) {
        //         services.MovieService.GetMoviesCollectionPaginated(selectedPageIndex, MAX_MOVIES_PER_PAGE).then(data => {
        //             setMoviesToDisplayInPage(data.Data);
        //         });
        //         return;
        //     }
        //     services.MovieService.GetMoviesSubscriptionPaginated(selectedPageIndex, MAX_MOVIES_PER_PAGE).then(data => {
        //         setMoviesToDisplayInPage(data.Data);
        //     });
        //     setIsPageEdited(false);
        //     return;
        // }
    };

    // const handleSidebarClick = (page: string): void => {
    //     setIsSidebarClicked(true);
    //     setTimeout(() => {
    //         setIsSidebarClicked(false);
    //     }, 500);
    //     if (page.includes(DASHBOARD_PATH)) {
    //         if (!window.location.href.includes(DASHBOARD_PATH)) {
    //             navigate(DASHBOARD_PATH);
    //             setIsDashboardPageClicked(true);
    //         }
    //         return;
    //     }
    //     setIsDashboardPageClicked(false);
    //     if (window.location.href.includes(page)) {
    //         return;
    //     }
    //     const prevUrl: string = window.location.href;
    //     if (prevUrl !== previousUrl) {
    //         setPreviousUrl(prevUrl);
    //         setIsPageEdited(true);
    //     }
    //     setMoviesToDisplayInPage(undefined);
    //     switch (page) {
    //         case MY_COLLECTION_PATH: {
    //             services.MovieService.GetMoviesCollectionPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
    //                 if (data.Data! === undefined) {
    //                     setMoviesToDisplayInPage(undefined);
    //                     return;
    //                 }
    //                 setTimeout(() => {
    //                     setMoviesToDisplayInPage(data.Data!);
    //                     services.MovieService.GetMoviesCollection().then((data: IResponse<IMovie[]>) => {
    //                         setMovies(data.Data!)
    //                     })
    //                 }, 1000);
    //                 setTimeout(() => {
    //                     setAreMoviesLoaded(true);
    //                 }, 2000);
    //             });
    //             break;
    //         }
    //         case TRENDING_PATH: {
    //             setTimeout(() => {
    //                 setMoviesToDisplayInPage(undefined);
    //                 setAreMoviesLoaded(true);
    //             }, 1000);
    //             break;
    //         }
    //         case MY_HISTORY_PATH: {
    //             services.MovieService.GetMoviesHistoryPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
    //                 if (data.Data! === undefined) {
    //                     setMoviesToDisplayInPage(undefined);
    //                     return;
    //                 }
    //                 setTimeout(() => {
    //                     setMoviesToDisplayInPage(data.Data!);
    //                     services.MovieService.GetMoviesHistory().then((data: IResponse<IMovie[]>) => {
    //                         setMovies(data.Data!);
    //                     });
    //                 }, 1000);
    //                 setTimeout(() => {
    //                     setAreMoviesLoaded(true);
    //                 }, 2000);
    //             });
    //             break;
    //         }
    //         case WATCH_LATER_PATH: {
    //             services.MovieService.GetMoviesSubscriptionPaginated(START_PAGE_INDEX, MAX_MOVIES_PER_PAGE).then(data => {
    //                 if (data.Data! === undefined) {
    //                     setMoviesToDisplayInPage([]);
    //                     return;
    //                 }
    //                 setTimeout(() => {
    //                     setMoviesToDisplayInPage(data.Data!);
    //                     services.MovieService.GetMoviesSubscription().then((data: IResponse<IMovie[]>) => {
    //                         setMovies(data.Data!);
    //                     });
    //                 }, 1000);
    //                 setTimeout(() => {
    //                     setAreMoviesLoaded(true);
    //                 }, 2000);
    //             });
    //             break;
    //         }
    //         default: {
    //             setMovies(homeMovies);
    //             onPageChange(1, false);
    //             break;
    //         }
    //     }
    // };

    // const isDataLoaded = (): boolean => {
    //     return areHistoryMoviesLoaded &&
    //         areWatchLaterMoviesLoaded &&
    //         areCollectionMoviesLoaded;
    // };

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
            onPageChange(1, false, undefined);
        }
    };

    const handleSearchboxText = (searchText: string) => {
        if (searchText !== '') {
            setSearchBoxText(searchText);
            onPageChange(1, true);
        }
    };

    return <div className={containerClassName}>
        {/* <Navbar collectAdvancedSearchedMovies={collectAdvancedSearchedMovies}
            handleSearchboxText={handleSearchboxText}
            handleRefreshMovies={handleRefreshMovies}
            isAdvancedSearchClosed={isAdvancedSearchClosed}
            isDashboardPageClicked={isDashboardPageClicked} /> */}
        {/* {(!isDashboardPageClicked) || isAdvancedMoviesSpinnerLoading ?
            <div>
                <Spinner styles={loadingSpinnerStyle}
                    label={SPINNER_LOADING_MOVIES_MESSAGE}
                    ariaLive="assertive"
                    labelPosition="top" />
            </div> : */}
        <div>
            <div className={mainLogoDivClassName}>
                <Logo mainLogoClassName={mainLogoClassName}
                    mainTextClassName={mainTextClassName} />
            </div>
            {isDashboardPageClicked && <Dashboard />}
            {/* {moviesToDisplayInPage !== undefined && !isDashboardPageClicked && <MovieCardsContainer
                moviesToDisplayInPage={movieContext.currentUsedMovies !== undefined ? movieContext.currentUsedMovies : []} />} */}
            <MovieCardsContainer moviesToDisplayInPage={moviesToDisplayInPage !== undefined ? moviesToDisplayInPage : []} />
            {/* {<CustomDialog dialogStyles={dialogStyles}
                acceptedButtonStyles={acceptedButtonStyles}
                mainText={"Are you sure you want to refresh movies?"}
                isHidden={!refreshMoviesConfirmation}
                handleCloseDialog={handleCloseDialog}
                acceptedText="Yes"
                cancelText='No' />} */}
            {
                !isDashboardPageClicked &&
                <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                    totalItemsCount={movieContext.movies.length}
                    onPageChange={onPageChange}
                    loadFromPage={loadFromPage}
                    isPageEdited={isPageEdited} />
            }
        </div>
        {/* } */}
    </div>
};