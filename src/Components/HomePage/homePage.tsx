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
    SPINNER_LOADING_MOVIES_MESSAGE
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

    return <div className={containerClassName}>
        <Navbar />
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
                <SideBar />
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