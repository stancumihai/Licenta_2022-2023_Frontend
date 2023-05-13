import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { ITopGenresProps } from './topGenres.types'
import {
    containerClassName,
    examplesMessageClassName,
    genreClassName,
    movieEntryClassName
} from './topGenresCard.styles'
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovie } from '../../Models/IMovie';

export const TopGenresCard = (props: ITopGenresProps): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetMoviesByGenre(props.genre, 1, 5));

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

    return <div className={containerClassName}>
        {areMoviesLoaded &&
            < >
                <h2 className={genreClassName}>{props.genre}</h2>
                <h3 className={examplesMessageClassName}>Some examples are:</h3>
                <ul style={{ marginLeft: '-10px' }}>
                    {movies.map((movie: IMovie, i: number) => {
                        return <li key={i} className={movieEntryClassName}>{movie.title}</li>
                    })}
                </ul>
            </ >
        }
    </div>
}