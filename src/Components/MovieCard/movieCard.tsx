import { MovieCardRating } from '../MovieCardRating/movieCardRating';
import { cardClassName, cardTitleClassName, movieCardPictureClassName } from './movieCard.styles';
import { IMovieCardProps } from './movieCard.types';

export const MovieCard = (props: IMovieCardProps): JSX.Element => {
    return <div className={cardClassName}>
        <img className={movieCardPictureClassName}
            src={props.pictureUrl}
            alt='Loading'></img>
        <MovieCardRating rating={props.rating} />
        <p className={cardTitleClassName}>{props.name}</p>
    </div>
};