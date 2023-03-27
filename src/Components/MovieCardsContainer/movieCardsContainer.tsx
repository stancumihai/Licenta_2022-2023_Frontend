import { useState } from 'react';
import { MovieCard } from '../MovieCard/movieCard';
import { containerClassName } from './movieCardsContainer.styles';

export const MovieCardsContainer = (): JSX.Element => {
    const [movies, setMovies] = useState<{ name: string, rating: number }[]>([
        { name: "The Story of the Kelly Gang", rating: 1 },
        { name: "Miss Jerry", rating: 2 },
        { name: "John Wick: Chapter 4", rating: 3 },
        { name: "John Wick: Chapter 3", rating: 4 },
        { name: "John Wick: Chapter 2", rating: 5.5 },
        { name: "John Wick: Chapter 1", rating: 8.2 },
        { name: "Top Gun Maverick", rating: 1 },
        { name: "The Dark Knight", rating: 1 }
    ]);

    return <div className={containerClassName}>
        {movies.map((movie: { name: string, rating: number }) => {
            return <MovieCard name={movie.name}
                rating={movie.rating} />
        })}
    </div>
};