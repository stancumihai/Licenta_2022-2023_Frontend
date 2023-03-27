import {
    useEffect,
    useState
} from 'react';
import { MovieCardRating } from '../MovieCardRating/movieCardRating';
import {
    cardClassName,
    cardTitleClassName,
    movieCardPictureClassName
} from './movieCard.styles';
import { IMovieCardProps } from './movieCard.types';

export const MovieCard = (props: IMovieCardProps): JSX.Element => {
    const [imageSource, setImageSource] = useState<string>('');

    const MOVIE_QUERY_URL: string = 'https://api.themoviedb.org/3/search/movie?api_key=aa32df38f33efcf6781400cf7584d8bb&query='
    const POSTERS_QUERY_URL: string = 'https://api.themoviedb.org/3/movie';
    const IMAGE_SOURCE_URL: string = 'https://image.tmdb.org/t/p/w185/';

    useEffect(() => {
        seedTMDBImage();
    }, [])

    const seedTMDBImage = () => {
        fetch(`${MOVIE_QUERY_URL}${props.name}`)
            .then((response) => response.json())
            .then((data) => {
                const id = data.results[0].id;
                fetch(`${POSTERS_QUERY_URL}/${id}/images?api_key=aa32df38f33efcf6781400cf7584d8bb`)
                    .then((response2) => response2.json()).then((data2) => {
                        const image = data2.posters[0].file_path;
                        setImageSource(`${IMAGE_SOURCE_URL}` + image);
                    })
            });
    };

    return <div className={cardClassName}>
        <img className={movieCardPictureClassName}
            src={imageSource}
            alt='Loading'></img>
        <MovieCardRating rating={props.rating} />
        <p className={cardTitleClassName}>{props.name}</p>
    </div>
};