import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { IMovieContext } from './movieContext.types';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovie } from '../../Models/IMovie';
import { IMovieContextType } from '../../Enums/movieContextType';

const MovieContext: React.Context<IMovieContext> = createContext<IMovieContext>({
    movies: [],
    collectionMovies: [],
    historyMovies: [],
    watchLaterMovies: [],
    setCurrentMovies: () => { },
    currentUsedMovies: [],
    isAllDataLoaded: () => { return false; }
});

export const MovieContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAll());

    const [collectionMovies, setCollectionMovies] = useState<IMovie[]>([]);
    const [areCollectionMoviesLoaded, setAreCollectionMoviesLoaded] = useState<boolean>(false);
    const colectionMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesCollection());

    const [historyMovies, setHistoryMovies] = useState<IMovie[]>([]);
    const [areHistoryMoviesLoaded, setAreHistoryMoviesLoaded] = useState<boolean>(false);
    const historyMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesHistory());

    const [watchLaterMovies, setWatchLaterMovies] = useState<IMovie[]>([]);
    const [areWatchLaterMoviesLoaded, setAreWatchLaterMoviesLoaded] = useState<boolean>(false);
    const watchLaterMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesSubscription());

    const [currentUsedMovies, setCurrentUserMovies] = useState<IMovie[]>([]);

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
        setAreCollectionMoviesLoaded(true);
    }, [colectionMoviesData]);

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

    const isInitialDataLoaded = (): boolean => {
        return areMoviesLoaded;
    };

    const isAllDataLoaded = (): boolean => {
        return areMoviesLoaded &&
            areCollectionMoviesLoaded &&
            areHistoryMoviesLoaded &&
            areWatchLaterMoviesLoaded;
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
                setCurrentUserMovies(historyMovies);
                return;
            }
            case IMovieContextType.WATCHLATER: {
                setCurrentUserMovies(watchLaterMovies);
                return;
            }
            default: {
                setCurrentUserMovies(movies);
                return;
            }
        }
    };

    return (<MovieContext.Provider value={{
        movies,
        collectionMovies,
        watchLaterMovies,
        historyMovies,
        setCurrentMovies,
        currentUsedMovies,
        isAllDataLoaded
    }}> {isInitialDataLoaded() && children} </MovieContext.Provider>);
};

export default MovieContext;