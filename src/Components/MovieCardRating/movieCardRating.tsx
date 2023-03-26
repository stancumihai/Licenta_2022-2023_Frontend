import { containerClassName, ratingClassName } from './movieCardRating.styles';
import { IMovieCardRatingProps } from './movieCardRating.types';

export const MovieCardRating = (props: IMovieCardRatingProps): JSX.Element => {
    return <div className={containerClassName}>
        <p className={ratingClassName}>{props.rating.toPrecision(2).toString()}</p>
    </div>
};