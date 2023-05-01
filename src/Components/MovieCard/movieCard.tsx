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
import {
    NavigateFunction,
    NavigateOptions,
    useNavigate
} from 'react-router';
import { MOVIE_NOT_FOUND_IMAGE_LOCATION, MOVIE_WRAPPER_PATH, MY_COLLECTION_PATH, MY_HISTORY_PATH, WATCH_LATER_PATH } from '../../Library/constants';

export const MovieCard = (props: IMovieCardProps): JSX.Element => {
    const MOVIE_QUERY_URL: string = 'https://api.themoviedb.org/3/search/movie?api_key=aa32df38f33efcf6781400cf7584d8bb&query='
    const POSTERS_QUERY_URL: string = 'https://api.themoviedb.org/3/movie';
    const IMAGE_SOURCE_URL: string = 'https://image.tmdb.org/t/p/w185/';

    const [imageSource, setImageSource] = useState<string>('');
    const [ratingToBeDisplayed, setRatingToBeDisplayed] = useState<number>(0);
    const navigate: NavigateFunction = useNavigate();

    const waitUntilPageHelperChanges = () => {
        if (props.pageChangeHelper === true) {
            setTimeout(() => {
                waitUntilPageHelperChanges();
            }, 100);
            return;
        }
        return;
    };

    const getCurrentMovieRating = () => {
        fetch('https://localhost:7145/api/MovieRatings/movie/' + props.movieUid)
            .then((response) => response.json()).then((data) => {
                setRatingToBeDisplayed(data.averageRating);
            });
    };

    useEffect(() => {
        seedTMDBImage();
        getCurrentMovieRating();
    }, [waitUntilPageHelperChanges])

    const seedTMDBImage = () => {
        fetch(`${MOVIE_QUERY_URL}${props.name}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.results.length === 0) {
                    setImageSource(`${MOVIE_NOT_FOUND_IMAGE_LOCATION}`);
                    return;
                }
                const id = data.results[0].id;
                fetch(`${POSTERS_QUERY_URL}/${id}/images?api_key=aa32df38f33efcf6781400cf7584d8bb`)
                    .then((response2) => response2.json()).then((data2) => {
                        if (data2.posters.length === 0) {
                            setImageSource(`${MOVIE_NOT_FOUND_IMAGE_LOCATION}`)
                            return;
                        }
                        const image: string = data2.posters[0].file_path;
                        setImageSource(`${IMAGE_SOURCE_URL}` + image);
                    })
            });
    };

    const handleMovieCardClick = (): void => {
        const navigateOptions: NavigateOptions = {
            state: {
                id: props.movieUid,
                imageSource: imageSource,
            }
        };
        const page: string = window.location.href.split('/')[4];
        if (page === undefined) {
            navigate(`${MOVIE_WRAPPER_PATH}/${props.name}`, navigateOptions);
            return;
        }
        navigate(`${MOVIE_WRAPPER_PATH}/${props.name}?${page}`, navigateOptions);
    };

    return <div className={cardClassName}
        onClick={handleMovieCardClick}>
        <img className={movieCardPictureClassName}
            src={imageSource}
            alt='Loading'></img>
        <MovieCardRating rating={ratingToBeDisplayed} />
        <p className={cardTitleClassName}>{props.name}</p>
    </div>
};