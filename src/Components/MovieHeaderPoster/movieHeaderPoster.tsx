import {
    headerPosterClassName,
    movieTitleClassName,
    pageTitleContainerClassName,
    pageTitleOverlayClassName,
    paragraphClassName,
    textContainerClassName
} from './movieHeaderPoster.styles';
import { IMovieHeaderPosterProps } from './movieHeaderPoster.types';

export const MovieHeaderPoster = (props: IMovieHeaderPosterProps): JSX.Element => {
    return <div className={pageTitleContainerClassName}>
        <img className={headerPosterClassName}
            src="https://themes.thememasters.club/sequex-dark/wp-content/uploads/sites/13/2017/11/header.jpg"
            alt="Loading"></img>
        <div className={pageTitleOverlayClassName}>
        </div>
        <div className={textContainerClassName}>
            <h1 className={movieTitleClassName} >{props.movieTitle}</h1>
            <p className={paragraphClassName}>{'May The Odds Be Ever In Your Favor'}</p>
        </div>
    </div>
};