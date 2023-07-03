import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import { IMovieContext } from './movieContext.types';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovie } from '../../Models/IMovie';
import { IMovieContextType } from '../../Enums/movieContextType';
import { IRecommendationRead } from '../../Models/Recommendation/IRecommendationRead';
import { IMovieSubscriptionRead } from '../../Models/MovieSubscription/IMovieSubscriptionRead';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';
import { ILikedMovieRead } from '../../Models/LikedMovie/ILikedMovieRead';

const MovieContext: React.Context<IMovieContext> = createContext<IMovieContext>({
    movies: [],
    collectionMovies: [],
    historyMovies: [],
    watchLaterMovies: [],
    setCurrentMovies: () => { },
    monthlyRecommendations: [],
    currentUsedMovies: [],
    refreshMovies: false,
    setRecommendations: () => { },
    setRefreshMoviesState: () => { },
    likedMovies: [],
    setRefreshWatchLaterMoviesState: () => { },
});

export const MovieContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAll());

    const [refreshMovies, setRefreshMovies] = useState<boolean>(false);
    const [refreshWatchLaterMovies, setRefreshWatchLaterMovies] = useState<boolean>(false);

    const [collectionMovies, setCollectionMovies] = useState<IMovie[]>([]);
    const [areCollectionMoviesLoaded, setAreCollectionMoviesLoaded] = useState<boolean>(false);
    const collectionMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesCollection(), [refreshMovies.toString()]);

    const [historyMovies, setHistoryMovies] = useState<ISeenMovieRead[]>([]);
    const [areHistoryMoviesLoaded, setAreHistoryMoviesLoaded] = useState<boolean>(false);
    const historyMoviesData: IFetchResult<ISeenMovieRead[]> = useFetch<ISeenMovieRead[]>(() => services.MovieService.GetMoviesHistory(), [refreshMovies.toString()]);

    const [watchLaterMovies, setWatchLaterMovies] = useState<IMovieSubscriptionRead[]>([]);
    const [areWatchLaterMoviesLoaded, setAreWatchLaterMoviesLoaded] = useState<boolean>(false);
    const watchLaterMoviesData: IFetchResult<IMovieSubscriptionRead[]> = useFetch<IMovieSubscriptionRead[]>(() => services.MovieService.GetMoviesSubscription(), [refreshWatchLaterMovies.toString()]);
    const [currentUsedMovies, setCurrentUserMovies] = useState<IMovie[]>([]);

    const [likedMovies, setLikedMovies] = useState<ILikedMovieRead[]>([]);
    const [areLikedMoviesLoaded, setAreLikedMoviesLoaded] = useState<boolean>(false);
    const likedMoviesData: IFetchResult<ILikedMovieRead[]> = useFetch<ILikedMovieRead[]>(() => services.LikedMoviesService.GetAll(), [refreshMovies.toString()]);

    const [userRecommendations, setUserRecommendations] = useState<IRecommendationRead[]>([]);

    const [monthlyRecommendations, setMonthlyRecommendations] = useState<IRecommendationRead[]>([]);
    const [areMonthyRecommendationsLoaded, setAreMonthlyRecommendationsLoaded] = useState<boolean>(false);
    const monthlyRecommendationsData: IFetchResult<IRecommendationRead[]> = useFetch<IRecommendationRead[]>(
        () => services.RecommendationService.GetAllByMonth(new Date().getFullYear(),
            new Date().getMonth() + 1),
        [refreshMovies.toString()]);

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
        setMovies(movieData.data!.Data!);
        setAreMoviesLoaded(true);
    }, [movieData]);

    useEffect(() => {
        if (collectionMoviesData.isLoading) {
            return;
        }
        if (collectionMoviesData.errors !== "" ||
            collectionMoviesData.data?.Error !== undefined ||
            collectionMoviesData.data == null ||
            collectionMoviesData.data.Data === undefined) {
            return;
        }
        setCollectionMovies(collectionMoviesData.data!.Data!);
        setAreCollectionMoviesLoaded(true);
    }, [collectionMoviesData]);

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
        setAreWatchLaterMoviesLoaded(true);
    }, [watchLaterMoviesData]);

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
        setAreHistoryMoviesLoaded(true);
    }, [historyMoviesData]);

    useEffect(() => {
        if (monthlyRecommendationsData.isLoading) {
            return;
        }
        if (monthlyRecommendationsData.errors !== "" ||
            monthlyRecommendationsData.data?.Error !== undefined ||
            monthlyRecommendationsData.data == null ||
            monthlyRecommendationsData.data.Data === undefined) {
            return;
        }
        setMonthlyRecommendations(monthlyRecommendationsData.data!.Data!);
        setAreMonthlyRecommendationsLoaded(true);
    }, [monthlyRecommendationsData, refreshMovies]);

    useEffect(() => {
        if (likedMoviesData.isLoading) {
            return;
        }
        if (likedMoviesData.errors !== "" ||
            likedMoviesData.data?.Error !== undefined ||
            likedMoviesData.data == null ||
            likedMoviesData.data.Data === undefined) {
            return;
        }
        setLikedMovies(likedMoviesData.data!.Data!);
        setAreLikedMoviesLoaded(true);
    }, [likedMoviesData, refreshMovies]);

    const isInitialDataLoaded = (): boolean => {
        return areMoviesLoaded;
    };

    const setCurrentMovies = (movieContextType: IMovieContextType, otherCollection?: IMovie[]) => {
        if (otherCollection !== undefined) {
            setCurrentUserMovies(otherCollection);
            return;
        }
        switch (movieContextType) {
            case IMovieContextType.COLLECTION: {
                setCurrentUserMovies(collectionMovies);
                return;
            }
            case IMovieContextType.HISTORY: {
                setCurrentUserMovies(historyMovies.map(m => m.movie));
                return;
            }
            case IMovieContextType.WATCHLATER: {
                setCurrentUserMovies(watchLaterMovies.map(m => m.movie));
                return;
            }
            case IMovieContextType.RECOMMENDATIONS: {
                setCurrentUserMovies(userRecommendations.map(m => m.movie));
                return;
            }
            default: {
                setCurrentUserMovies(movies);
                return;
            }
        }
    };

    const setRefreshMoviesState = (): void => {
        setRefreshMovies(prev => !prev);
        setAreHistoryMoviesLoaded(false);
        setAreCollectionMoviesLoaded(false);
        //setAreWatchLaterMoviesLoaded(false);
        setAreMonthlyRecommendationsLoaded(false);
    };

    const setRefreshWatchLaterMoviesState = (): void => {
        setRefreshWatchLaterMovies(prev => !prev);
        setAreWatchLaterMoviesLoaded(false);
    };

    const setRecommendations = (recommendations: IRecommendationRead[]) => {
        setUserRecommendations(recommendations);
    };

    return (<MovieContext.Provider value={{
        movies,
        collectionMovies,
        watchLaterMovies,
        historyMovies,
        setCurrentMovies,
        currentUsedMovies,
        setRefreshMoviesState,
        refreshMovies,
        monthlyRecommendations,
        setRecommendations,
        likedMovies,
        setRefreshWatchLaterMoviesState,
    }}> {isInitialDataLoaded() && children} </MovieContext.Provider>);
};

export default MovieContext;