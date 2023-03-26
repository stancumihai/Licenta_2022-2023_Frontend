import { useState } from 'react';
import { MovieCard } from '../MovieCard/movieCard';
import { containerClassName } from './movieCardsContainer.styles';

export const MovieCardsContainer = (): JSX.Element => {
    const [movies, setMovies] = useState<{ name: string, rating: number }[]>([
        { name: "Movie1", rating: 1 },
        { name: "Movie2", rating: 2 },
        { name: "Movie3", rating: 3 },
        { name: "Movie4", rating: 4 },
        { name: "Movie5", rating: 5.5 },
        { name: "Movie6", rating: 8.2 },
        { name: "Movie7", rating: 1 },
        { name: "Movie8", rating: 1 }
    ]);

    return <div className={containerClassName}>
        {movies.map((movie: { name: string, rating: number }) => {
            return <MovieCard name={movie.name}
                rating={movie.rating}
                pictureUrl="./assets/testMovieCardPhoto.png"
            />
        })}
    </div>
};