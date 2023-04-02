import {
    useEffect,
    useState
} from 'react';
import { IPerson } from '../../Models/IPerson';
import {
    containerClassName,
    detailSpanTitleClassName,
    listClassName,
    paragraphListingClassName,
    listItemClassName,
    titleClassName
} from './movieDetails.styles';
import { IMovieDetailsProps, overviewExample } from './movieDetails.types';

export const MovieDetails = (props: IMovieDetailsProps): JSX.Element => {
    const [directorName, setDirectorName] = useState<string>('');
    const [actors, setActors] = useState<IPerson[]>([]);

    useEffect(() => {
        const directors: IPerson[] = props.moviePersons.filter((moviePerson: IPerson) => {
            return moviePerson.professions.split(',').includes('director');
        })
        if (directors.length > 0) {
            setDirectorName(directors[0].name);
        }
    }, []);

    useEffect(() => {
        const actors: IPerson[] = props.moviePersons.filter((moviePerson: IPerson) => {
            return !moviePerson.professions.split(',').includes('director');
        })
        setActors(actors);
    }, []);

    const mapGenres = (): JSX.Element[] => {
        const genres: string[] = props.movie.genres.split(',');
        return genres.map((genre: string, index: number) => {
            if (index !== genres.length - 1) {
                return <p key={index} className={paragraphListingClassName}>{genre + ","} </p>
            }
            return <p key={index} className={paragraphListingClassName}>{genre} </p>
        })
    };

    const mapActors = (): JSX.Element[] => {
        return actors.map((actor: IPerson, index: number) => {
            if (index !== actors.length - 1) {
                return <p key={index} className={paragraphListingClassName}> {actor.name + ","} </p>
            }
            return <p key={index} className={paragraphListingClassName}>
                {actor.name} </p>
        });
    };

    return <div className={containerClassName}>
        <h3 className={titleClassName}>Movie Details</h3>
        <ul className={listClassName}>
            <li className={listItemClassName}>
                <span className={detailSpanTitleClassName}>Release Date</span>
                <p>{props.movie.yearOfRelease}</p>
            </li>
            {directorName !== '' ?
                <li className={listItemClassName}>
                    <span className={detailSpanTitleClassName}>Director</span>
                    <p>{directorName}</p>
                </li> : null}
            <li className={listItemClassName}>
                <span className={detailSpanTitleClassName}>Runtime</span>
                <p>{props.movie.runtime}</p>
            </li>
            {actors.length > 0 ?
                <li className={listItemClassName}>
                    <span className={detailSpanTitleClassName}>Actors</span>
                    {mapActors()}
                </li> : null}
            <li className={listItemClassName}>
                <span className={detailSpanTitleClassName}>Genres</span>
                {mapGenres()}
            </li>
            <li className={listItemClassName}>
                <span className={detailSpanTitleClassName}>Overview</span>
                <p>{overviewExample}</p>
            </li>
        </ul>
    </div>
};