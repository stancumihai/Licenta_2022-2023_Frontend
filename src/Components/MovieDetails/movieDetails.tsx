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
    ratingStyles,
    seenMoviesCountClassName,
    iconButtonStyles
} from './movieDetails.styles';
import {
    IMovieDetailsProps,
    overviewExample
} from './movieDetails.types';
import { MdWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { IResponse } from '../../Models/IResponse';
import { IMovieSubscriptionCreate } from '../../Models/MovieSubscription/IMovieSubscriptionCreate';
import { IMovieSubscriptionRead } from '../../Models/MovieSubscription/IMovieSubscriptionRead';
import { ISeenMovieCreate } from '../../Models/SeenMovie/ISeenMovieCreate';
import { Rating } from '@fluentui/react';
import { IconButton, RatingSize } from 'office-ui-fabric-react';
import { IUserMovieRatingRead } from '../../Models/UserMovieRating/IUserMovieRatingRead';
import { IUserMovieRatingCreate } from '../../Models/UserMovieRating/IUserMovieRatingCreate';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovieRating } from '../../Models/IMovieRating';
import { CustomDialog } from '../CustomDialog/customDialog';
import {
    acceptedButtonStyles,
    dialogStyles
} from '../HomePage/homePage.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { HOME_PATH } from '../../Library/constants';
import { UserType } from '../../Enums/UserType';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';
import MovieContext from '../../Contexts/Movie/movieContext';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import { IRecommendationUpdate } from '../../Models/Recommendation/IRecommendationUpdate';

export const MovieDetails = (props: IMovieDetailsProps): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const [directorName, setDirectorName] = useState<string>('');
    const [actors, setActors] = useState<IPerson[]>([]);
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);

    const [isMovieLiked, setIsMovieLiked] = useState<boolean>(false);
    const [movieLikeId, setMovieLikedId] = useState<string | undefined>(undefined);

    const [isWatchLaterChecked, setIsWatchLaterChecked] = useState<boolean>(false);
    const [movieSubscriptionId, setMovieSubscriptionId] = useState<string | undefined>(undefined);

    const [movieRating, setMovieRating] = useState<number>(0);
    const [isMovieRatingLoaded, setIsMovieRatingLoaded] = useState<boolean>(false);
    const movieRatingData: IFetchResult<IUserMovieRatingRead> = useFetch<IUserMovieRatingRead>(() =>
        services.UserMovieRatingsService.GetByMovieAndUser(props.movieRating.movie.uid!));
    const [isConfirmationSeenDialogOpen, setIsConfirmationSeenDialogOpen] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();
    const uiContext: IUiContext = useContext(UiContext);

    const [seenMovies, setSeenMovies] = useState<ISeenMovieRead[]>([]);
    const [areSeenMoviesLoaded, setAreSeenMoviesLoaded] = useState<boolean>(false);
    const seenMoviesData: IFetchResult<ISeenMovieRead[]> = useFetch<ISeenMovieRead[]>(() =>
        services.SeenMoviesService.GetByUserAndMovie(props.movieRating.movie.uid!));
    const movieContext: IMovieContext = useContext(MovieContext);

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
        const filteredData = movieContext.likedMovies.filter(m => m.movie.uid! === props.movieRating.movie.uid! && m.userUid === authenticationContext.User.uid!);
        if (filteredData.length === 0) {
            setIsMovieLiked(false);
            setMovieLikedId(undefined);
            return;
        }
        setIsMovieLiked(true);
        setMovieLikedId(filteredData[0].uid!);
    }, [isMovieLiked, movieLikeId, movieContext.likedMovies]);


    useEffect(() => {
        const filteredData = movieContext.watchLaterMovies.filter(m => m.movie.uid! === props.movieRating.movie.uid! && m.userUid === authenticationContext.User.uid!);
        if (filteredData.length === 0) {
            setIsWatchLaterChecked(false);
            setMovieSubscriptionId(undefined);
            return;
        }
        setIsWatchLaterChecked(true);
        setMovieSubscriptionId(filteredData[0].uid!);
    }, [isWatchLaterChecked, movieSubscriptionId, movieContext.watchLaterMovies]);

    useEffect(() => {
        if (seenMoviesData.isLoading) {
            return;
        }
        if (seenMoviesData.errors !== "" ||
            seenMoviesData.data?.Error !== undefined ||
            seenMoviesData.data == null ||
            seenMoviesData.data.Data === undefined) {
            return;
        }
        setSeenMovies(seenMoviesData.data!.Data!);
        setAreSeenMoviesLoaded(true);
    }, [seenMoviesData]);

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

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

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

    const handleMovieLikeClick = (disliked?: boolean): void => {
        const likedMovie: any = {
            movieUid: props.movieRating.movie.uid!,
            userUid: authenticationContext.User.uid!
        };
        if (isRecommendationsPath()) {
            const userRecommendations = movieContext.monthlyRecommendations.filter(m => m.userUid === authenticationContext.User.uid);
            const recommendation = userRecommendations.filter(m => m.movie.uid === props.movieRating.movie.uid)[0];
            const updateRecommendation: IRecommendationUpdate =
            {
                uid: recommendation.uid,
                likedDecisionDate: new Date(),
                isLiked: true
            };
            if (disliked === true) {
                updateRecommendation.isLiked = false;
            }
            services.RecommendationService.Update(updateRecommendation);
        }
        if (disliked === true) {
            return;
        }
        if (isMovieLiked) {
            services.LikedMoviesService.Delete(movieLikeId!).then((data) => {
                setIsMovieLiked(false);
                setMovieLikedId('');
                movieContext.setRefreshMoviesState();
            });
            return;
        }
        services.LikedMoviesService.Add(likedMovie).then((data) => {
            setIsMovieLiked(true);
            movieContext.setRefreshMoviesState();
            setMovieLikedId(data.Data!.uid!);
        });
    };

    const handleWatchLaterClick = (): void => {
        const movieSubscription: IMovieSubscriptionCreate = {
            movieUid: props.movieRating.movie.uid!,
            userUid: authenticationContext.User.uid!
        };
        if (isWatchLaterChecked) {
            services.MovieSubscriptionsService.Delete(movieSubscriptionId!).then((data) => {
                movieContext.setRefreshWatchLaterMoviesState();
                setIsWatchLaterChecked(false);
                setMovieSubscriptionId(undefined);
            });
            return;
        }
        services.MovieSubscriptionsService.Add(movieSubscription).then((data: any) => {
            setMovieSubscriptionId(data.Data!.uid!)
            movieContext.setRefreshWatchLaterMoviesState();
            setIsWatchLaterChecked(true);
        });
    };

    const handleSeenClick = (): void => {
        if (isWatchLaterPath()) {
            setIsConfirmationSeenDialogOpen(true);
            return;
        }
    };

    const processGlobalMovieRatingChange = (movieRating: IMovieRating, newMyRating: number, oldMyRating?: number) => {
        if (oldMyRating === undefined) {
            const newAverageRating: number = (movieRating.averageRating * movieRating.votesNumber + newMyRating) / (movieRating.votesNumber + 1);
            const newMovieRating: IMovieRating = { ...movieRating, averageRating: newAverageRating, votesNumber: movieRating.votesNumber + 1 };
            services.MovieRatingsService.Update(newMovieRating);
            return;
        }
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
            services.UserMovieRatingsService.Add(userMovieRating);
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
            services.UserMovieRatingsService.Update(userMovieRating);
            processGlobalMovieRatingChange(props.movieRating, rating! * 2, oldMyRating * 2);
        }
    };

    const isWatchLaterPath = (): boolean => {
        return window.location.href.includes('watchLater');
    };

    const isRecommendationsPath = (): boolean => {
        return window.location.href.includes('?recommendations');
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        setIsConfirmationSeenDialogOpen(false);
        if (accepted === true) {
            movieContext.setRefreshMoviesState();
            services.MovieSubscriptionsService.GetByUserAndMovie(props.movieRating.movie.uid!).then((data: IResponse<IMovieSubscriptionRead>) => {
                services.MovieSubscriptionsService.Delete(data.Data!.uid!).then(() => {
                    const seenMovie: ISeenMovieCreate = {
                        movieUid: props.movieRating.movie.uid!,
                        userUid: authenticationContext.User.uid!,
                    };
                    services.SeenMoviesService.Add(seenMovie).then(() => {
                        navigate(HOME_PATH);
                        uiContext.setRefreshState(true);
                    });
                });
            });
        }
    };

    return <div className={containerClassName}>
        <div className={iconContainerClassName}>
            <div style={{ display: 'flex', marginLeft: '-60%' }}>
                {!isWatchLaterPath() &&
                    <div onClick={handleWatchLaterClick}
                        style={isAdmin() || isRecommendationsPath() ? { display: 'none' } : {}}>
                        <MdWatchLater className={!isWatchLaterChecked ?
                            iconClassName :
                            disabledIconClassName} />
                        <p style={{ bottom: '1.5vh' }} className={!isWatchLaterChecked ?
                            buttonTextClassName :
                            disabledButtonTextClassName}>Save to Watch Later</p>
                    </div>
                }
            </div>
            <div style={{ display: 'flex', marginLeft: '-60%' }}>
                {!isWatchLaterPath() &&
                    <div onClick={() => handleMovieLikeClick()}
                        style={isAdmin() ? { display: 'none' } : {}}>
                        <AiOutlineLike className={!isMovieLiked ?
                            iconClassName :
                            disabledIconClassName} />
                        <p className={!isMovieLiked ?
                            buttonTextClassName :
                            disabledButtonTextClassName}>Like</p>
                    </div>
                }
            </div>
            <div style={{ display: 'flex' }}>
                {!isWatchLaterPath() &&
                    <div onClick={() => handleMovieLikeClick(true)}
                        style={!isRecommendationsPath() ? { display: 'none' } : {}}>
                        <IconButton iconProps={{ iconName: "Dislike" }}
                            styles={iconButtonStyles} />
                        <p className={buttonTextClassName}>Dislike</p>
                    </div>
                }
            </div>
            <div style={{ display: 'flex' }}>
                {isWatchLaterPath() &&
                    <>
                        <div onClick={handleSeenClick}
                            style={isAdmin() ? { display: 'none' } : {}}>
                            <BiCheckCircle className={isWatchLaterPath() ?
                                iconClassName :
                                disabledIconClassName} />
                            <p style={{ bottom: '1.5vh' }} className={isWatchLaterPath() ?
                                buttonTextClassName :
                                disabledButtonTextClassName}>Seen</p>
                        </div>
                        <p className={seenMoviesCountClassName}>{seenMovies.length}</p>
                    </>
                }
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
                <li style={isAdmin() ? { display: 'none' } : {}}
                    className={listItemClassName}>
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
            <CustomDialog acceptedButtonStyles={acceptedButtonStyles}
                dialogStyles={dialogStyles}
                mainText={"Are you sure you have seen this movie?"}
                isHidden={!isConfirmationSeenDialogOpen}
                handleCloseDialog={handleCloseDialog}
                acceptedText="Yes"
                cancelText='No' />
        </div>
        }
    </div>
};