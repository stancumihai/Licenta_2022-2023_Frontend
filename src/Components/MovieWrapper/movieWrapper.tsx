import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovieRating } from '../../Models/IMovieRating';
import { IPerson } from '../../Models/IPerson';
import { MovieDetails } from '../MovieDetails/movieDetails';
import { MovieHeaderPoster } from '../MovieHeaderPoster/movieHeaderPoster';
import { MovieSidebarDetails } from '../MovieSidebarDetails/movieSidebarDetails';
import { containerClassName, contentContainerClassName, innerContainer } from './movieWrapper.styles';

export const MovieWrapper = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const { state } = useLocation();
    const { id: movieUid, imageSource } = state;

    const movieRatingData: IFetchResult<IMovieRating> = useFetch<IMovieRating>(() => services.MovieRatingsService.GetByMovieUid(movieUid));
    const [movieRating, setMovieRating] = useState<IMovieRating>();
    const [isMovieRatingLoaded, setIsMovieRatingLoaded] = useState<boolean>(false);

    const moviePersonsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAllByMovieUid(movieUid));
    const [moviePersons, setMoviePersons] = useState<IPerson[]>([]);
    const [areMoviePersonsLoaded, setAreMoviePersonsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (movieRatingData.isLoading) {
            return;
        }
        if (movieRatingData.errors !== "" ||
            movieRatingData.data?.Error !== undefined ||
            movieRatingData.data == null ||
            movieRatingData.data.Data === undefined) {
            return;
        }
        setMovieRating(movieRatingData.data!.Data!);
        setIsMovieRatingLoaded(true);
    }, [movieRatingData]);

    useEffect(() => {
        if (moviePersonsData.isLoading) {
            return;
        }
        if (moviePersonsData.errors !== "" ||
            moviePersonsData.data?.Error !== undefined ||
            moviePersonsData.data == null ||
            moviePersonsData.data.Data === undefined) {
            return;
        }
        setMoviePersons(moviePersonsData.data!.Data!);
        setAreMoviePersonsLoaded(true);
    }, [moviePersonsData]);

    return <div  >
        {isMovieRatingLoaded && <MovieHeaderPoster movieTitle={movieRating!.movie.title} />}
        <div className={containerClassName}>
            <div className={innerContainer}>
                <div className={contentContainerClassName}>
                    {isMovieRatingLoaded && <MovieSidebarDetails imageSource={imageSource}
                        movieRating={movieRating!.averageRating}
                        votesNumber={movieRating!.votesNumber} />}
                    {areMoviePersonsLoaded && isMovieRatingLoaded && <MovieDetails movieRating={movieRating!} moviePersons={moviePersons} />}
                </div>
            </div>
        </div>
    </div>
};