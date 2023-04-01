import { useEffect, useState } from 'react';
import { IMovie } from '../../Models/IMovie';
import { MovieCard } from '../MovieCard/movieCard';
import { containerClassName } from './movieCardsContainer.styles';
import { IMovieCardsContainerProps } from './movieCardsContainer.types';

export const MovieCardsContainer = (props: IMovieCardsContainerProps): JSX.Element => {
    const [pageChangeHelper, setPageChangeHelper] = useState<boolean>(false);

    useEffect(() => {
        setPageChangeHelper(true);
    }, [props.moviesToDisplayInPage]);

    return <div className={containerClassName}>
        {props.moviesToDisplayInPage.map((movie: IMovie, i: number) => {
            return <MovieCard key={i}
                pageChangeHelper={pageChangeHelper}
                movieUid={movie.uid!}
                name={movie.title}
                genres={movie.genres} />
        })}
    </div>
};