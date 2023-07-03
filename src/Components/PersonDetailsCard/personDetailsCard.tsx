import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    containerClassName,
    knownForHeaderClassName,
    knownForMovieEntryClassName,
    personNameClassName
} from './personDetailsCard.styles';
import { IPersonDetailCardProps } from './personDetailsCard.types';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovie } from '../../Models/IMovie';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';

export const PersonDetailsCard = (props: IPersonDetailCardProps): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const movieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAllByPersonUid(props.person.uid!));

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
        <h2 className={personNameClassName}>{props.person.name}</h2>
        <h3 className={knownForHeaderClassName}>Known for:</h3>
        {areMoviesLoaded && <ul style={{ marginLeft: '-10px' }}>
            {movies.map((movie: IMovie, i: number) => {
                return <li key={i} className={knownForMovieEntryClassName}>{movie.title}</li>
            })}
        </ul>}
    </div>
};