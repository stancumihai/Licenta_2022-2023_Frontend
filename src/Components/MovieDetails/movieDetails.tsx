import {
    useContext,
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
    titleClassName,
    iconClassName,
    iconContainerClassName,
    buttonTextClassName,
    disabledButtonTextClassName,
    disabledIconClassName,
    ratingStyles
} from './movieDetails.styles';
import {
    IMovieDetailsProps,
    overviewExample
} from './movieDetails.types';
import { MdWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { ILikedMovieRead } from '../../Models/LikedMovie/ILikedMovieRead';
import AuthentificationContext from '../../Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Authentication/authenticationContext.types';
import { IResponse } from '../../Models/IResponse';
import { ILikedMovieCreate } from '../../Models/LikedMovie/ILikedMovieCreate';
import { IMovieSubscriptionCreate } from '../../Models/MovieSubscription/IMovieSubscriptionCreate';
import { IMovieSubscriptionRead } from '../../Models/MovieSubscription/IMovieSubscriptionRead';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';
import { ISeenMovieCreate } from '../../Models/SeenMovie/ISeenMovieCreate';
import { Rating } from '@fluentui/react';
import { RatingSize } from 'office-ui-fabric-react';
import { IUserMovieRatingRead } from '../../Models/UserMovieRating/IUserMovieRatingRead';
import { IUserMovieRatingCreate } from '../../Models/UserMovieRating/IUserMovieRatingCreate';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovieRating } from '../../Models/IMovieRating';

export const MovieDetails = (props: IMovieDetailsProps): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const [directorName, setDirectorName] = useState<string>('');
    const [actors, setActors] = useState<IPerson[]>([]);
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);

    const [isMovieLiked, setIsMovieLiked] = useState<boolean>(false);
    const [movieLikeId, setMovieLikedId] = useState<string>('');

    const [isWatchLaterChecked, setIsWatchLaterChecked] = useState<boolean>(false);
    const [movieSubscriptionId, setMovieSubscriptionId] = useState<string>('');

    const [isMovieSeen, setIsMovieSeen] = useState<boolean>(false);
    const [historyEntranceId, setHistoryEntranceId] = useState<string>('');

    const [movieRating, setMovieRating] = useState<number>(0);
    const [isMovieRatingLoaded, setIsMovieRatingLoaded] = useState<boolean>(false);
    const movieRatingData: IFetchResult<IUserMovieRatingRead> = useFetch<IUserMovieRatingRead>(() =>
        services.UserMovieRatings.GetByMovieAndUser(props.movieRating.movie.uid!));

    useEffect(() => {
        if (movieRatingData.isLoading) {
            return;
        }
        if (movieRatingData.data?.Status === 404) {
            setMovieRating(-1);
            setIsMovieRatingLoaded(true);
        }
        if (movieRatingData.errors !== "" ||
            movieRatingData.data?.Error !== undefined ||
            movieRatingData.data == null ||
            movieRatingData.data.Data === undefined) {
            return;
        }
        setMovieRating(movieRatingData.data!.Data!.rating);
        setIsMovieRatingLoaded(true);
    }, [movieRatingData]);

    useEffect(() => {
        if (!isMovieLiked) {
            services.LikedMoviesService.GetByUserAndMovie(props.movieRating.movie.uid!).then((data: IResponse<ILikedMovieRead>) => {
                if (data.Status! === 404 || data.Status! === 500) {
                    setTimeout(() => {
                        setIsMovieLiked(false);
                        setMovieLikedId('');
                    }, 500);
                    return;
                }
                setTimeout(() => {
                    setIsMovieLiked(true);
                    setMovieLikedId(data.Data!.uid!);
                }, 500);
                return;
            });
        }
    }, [isMovieLiked, movieLikeId]);

    useEffect(() => {
        if (!isWatchLaterChecked) {
            services.MovieSubscriptionsService.GetByUserAndMovie(props.movieRating.movie.uid!).then((data: IResponse<IMovieSubscriptionRead>) => {
                if (data.Status! === 404 || data.Status! === 500) {
                    setTimeout(() => {
                        setIsWatchLaterChecked(false);
                        setMovieSubscriptionId('');
                    }, 500);
                    return;
                }
                setTimeout(() => {
                    setIsWatchLaterChecked(true);
                    setMovieSubscriptionId(data.Data!.uid!);
                }, 500);
                return;
            });
        }
    }, [isWatchLaterChecked, movieSubscriptionId]);

    useEffect(() => {
        if (!isMovieSeen) {
            services.SeenMoviesService.GetByUserAndMovie(props.movieRating.movie.uid!).then((data: IResponse<ISeenMovieRead>) => {
                if (data.Status! === 404 || data.Status! === 500) {
                    setTimeout(() => {
                        setIsMovieSeen(false);
                        setHistoryEntranceId('');
                    }, 500);
                    return;
                }
                setTimeout(() => {
                    setIsMovieSeen(true);
                    setHistoryEntranceId(data.Data!.uid!);
                }, 500);
                return;
            });
        }
    }, [isMovieSeen, historyEntranceId]);

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
        const genres: string[] = props.movieRating.movie.genres.split(',');
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

    const handleMovieLikeClick = (): void => {
        const likedMovie: ILikedMovieCreate = {
            movieUid: props.movieRating.movie.uid!,
            userUid: authenticationContext.User.uid!
        };
        if (isMovieLiked) {
            services.LikedMoviesService.Delete(movieLikeId);
            setIsMovieLiked(false);
            setMovieLikedId('');
            setTimeout(() => {
                window.location.reload();
            }, 500);
            return;
        }
        services.LikedMoviesService.Add(likedMovie);
        setIsMovieLiked(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const handleWatchLaterClick = (): void => {
        const movieSubscription: IMovieSubscriptionCreate = {
            movieUid: props.movieRating.movie.uid!,
            userUid: authenticationContext.User.uid!
        };

        if (isWatchLaterChecked) {
            services.MovieSubscriptionsService.Delete(movieSubscriptionId);
            setIsWatchLaterChecked(false);
            setMovieSubscriptionId('');
            setTimeout(() => {
                window.location.reload();
            }, 500);
            return;
        }
        services.MovieSubscriptionsService.Add(movieSubscription);
        setIsWatchLaterChecked(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const handleSeenClick = (): void => {
        const seenMovie: ISeenMovieCreate = {
            movieUid: props.movieRating.movie.uid!,
            userUid: authenticationContext.User.uid!
        };

        if (isMovieSeen) {
            services.SeenMoviesService.Delete(historyEntranceId);
            setIsMovieSeen(false);
            setHistoryEntranceId('');
            setTimeout(() => {
                window.location.reload();
            }, 500);
            return;
        }
        services.SeenMoviesService.Add(seenMovie);
        setIsMovieSeen(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const processGlobalMovieRatingChange = (movieRating: IMovieRating, newMyRating: number, oldMyRating?: number) => {
        if (oldMyRating === undefined) {
            //sunt pe create
            const newAverageRating: number = (movieRating.averageRating * movieRating.votesNumber + newMyRating) / (movieRating.votesNumber + 1);
            const newMovieRating: IMovieRating = { ...movieRating, averageRating: newAverageRating, votesNumber: movieRating.votesNumber + 1 };
            services.MovieRatingsService.Update(newMovieRating);
            window.location.reload();
            return;
        }
        //sunt pe update
        const newAverageRating: number = (movieRating.averageRating * movieRating.votesNumber + newMyRating - oldMyRating) / movieRating.votesNumber;
        const newMovieRating: IMovieRating = { ...movieRating, averageRating: newAverageRating };
        services.MovieRatingsService.Update(newMovieRating);
    };

    const handleRatingChange = (event: React.FormEvent<HTMLElement>, rating?: number | undefined): void => {
        const oldMyRating: number = movieRating;
        setMovieRating(rating!);
        if (movieRating === -1) {
            const userMovieRating: IUserMovieRatingCreate = {
                userUid: authenticationContext.User.uid!,
                movieUid: props.movieRating.movie.uid!,
                rating: rating!
            };
            services.UserMovieRatings.Add(userMovieRating);
            processGlobalMovieRatingChange(props.movieRating, rating! * 2);
            return;
        }
        if (movieRating !== rating) {
            const userMovieRating: IUserMovieRatingRead = {
                uid: movieRatingData.data!.Data!.uid,
                userUid: authenticationContext.User.uid!,
                movieUid: props.movieRating.movie.uid!,
                rating: rating!
            };
            services.UserMovieRatings.Update(userMovieRating);
            //oldMyRating este pentru update
            processGlobalMovieRatingChange(props.movieRating, rating! * 2, oldMyRating * 2);
        }
    };

    return <div className={containerClassName}>
        <div className={iconContainerClassName}>
            <div style={{ display: 'flex' }}>
                <div>
                    <MdWatchLater onClick={handleWatchLaterClick}
                        className={!isWatchLaterChecked ?
                            iconClassName :
                            disabledIconClassName} />
                    <p style={{ bottom: '1.5vh' }} className={!isWatchLaterChecked ?
                        buttonTextClassName :
                        disabledButtonTextClassName}>Save to Watch Later</p>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <AiOutlineLike onClick={handleMovieLikeClick}
                    className={!isMovieLiked ?
                        iconClassName :
                        disabledIconClassName} />
                <p className={!isMovieLiked ?
                    buttonTextClassName :
                    disabledButtonTextClassName}>Like</p>
            </div>
            <div style={{ display: 'flex' }}>
                <div>
                    <BiCheckCircle onClick={handleSeenClick}
                        className={!isMovieSeen ?
                            iconClassName :
                            disabledIconClassName} />
                    <p style={{ bottom: '1.5vh' }} className={!isMovieSeen ?
                        buttonTextClassName :
                        disabledButtonTextClassName}>Seen</p>
                </div>
            </div>
        </div>
        {isMovieRatingLoaded && <div> <h3 className={titleClassName}>Movie Details</h3>
            <ul className={listClassName}>
                <li className={listItemClassName}>
                    <span className={detailSpanTitleClassName}>Release Date</span>
                    <p>{props.movieRating.movie.yearOfRelease}</p>
                </li>
                {directorName !== '' ?
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Director</span>
                        <p>{directorName}</p>
                    </li> : null}
                <li className={listItemClassName}>
                    <span className={detailSpanTitleClassName}>Runtime</span>
                    <p>{props.movieRating.movie.runtime}</p>
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
                <li className={listItemClassName}>
                    <span className={detailSpanTitleClassName}>My Rating</span>
                    <Rating max={5}
                        onChange={handleRatingChange}
                        styles={ratingStyles}
                        size={RatingSize.Large}
                        rating={movieRating === -1 ? 1 : movieRating}
                        ariaLabel="Large stars"
                        ariaLabelFormat="{0} of {1} stars"
                        allowZeroStars
                    />
                </li>
            </ul>
        </div>
        }
    </div>
};