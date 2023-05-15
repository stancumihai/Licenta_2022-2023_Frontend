import {
    useContext,
    useEffect,
    useState
} from 'react';
import { useLocation } from 'react-router-dom';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IMovie } from '../../Models/IMovie';
import {
    containerClassName as contentContainerClassName, titleClassName,

} from './userDetails.styles';
import { IUserDetailCardProps } from './userDetailTypes';
import { UserInformationCard } from '../UserInformationCard/userInformationCard';
import { COLOR1_D_40 } from '../../Library/constants';

export const UserDetails = (): JSX.Element => {
    const { state } = useLocation();
    const { selectedUser } = state;
    const services = useContext<ServiceContext>(ServiceContextInstance);

    const collectionMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAllMoviesCollectionByUser(selectedUser.userUid));
    const [collectionMovies, setCollectionMovies] = useState<IMovie[]>([]);
    const [areCollectionMoviesLoaded, setAreCollectionMoviesLoaded] = useState<boolean>(false);

    const seenMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.SeenMoviesService.GetAllByUser(selectedUser.userUid));
    const [seenMovies, setSeenMovies] = useState<IMovie[]>([]);
    const [areSeenMoviesLoaded, setAreSeenMoviesLoaded] = useState<boolean>(false);

    const watchLaterMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieSubscriptionsService.GetAllByUser(selectedUser.userUid));
    const [watchLaterMovies, setWatchLaterMovies] = useState<IMovie[]>();
    const [areWatchLaterMoviesLoaded, setAreWatchLaterMoviesLoaded] = useState<boolean>(false);

    const likedMoviesData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.LikedMoviesService.GetAllByUser(selectedUser.userUid));
    const [likedMovies, setLikedMovies] = useState<IMovie[]>();
    const [areLikedMovieLoaded, setAreLikedMoviesLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (collectionMoviesData.isLoading) {
            return;
        }
        if (collectionMoviesData.errors !== "" ||
            collectionMoviesData.data?.Error !== undefined ||
            collectionMoviesData.data == null ||
            collectionMoviesData.data.Data === undefined) {
            return;
        }
        setCollectionMovies(collectionMoviesData.data!.Data!);
        setAreCollectionMoviesLoaded(true);
    }, [collectionMoviesData]);

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
        if (watchLaterMoviesData.isLoading) {
            return;
        }
        if (watchLaterMoviesData.errors !== "" ||
            watchLaterMoviesData.data?.Error !== undefined ||
            watchLaterMoviesData.data == null ||
            watchLaterMoviesData.data.Data === undefined) {
            return;
        }
        setWatchLaterMovies(watchLaterMoviesData.data!.Data!);
        setAreWatchLaterMoviesLoaded(true);
    }, [watchLaterMoviesData]);

    useEffect(() => {
        if (likedMoviesData.isLoading) {
            return;
        }
        if (likedMoviesData.errors !== "" ||
            likedMoviesData.data?.Error !== undefined ||
            likedMoviesData.data == null ||
            likedMoviesData.data.Data === undefined) {
            return;
        }
        setLikedMovies(likedMoviesData.data!.Data!);
        setAreLikedMoviesLoaded(true);
    }, [likedMoviesData]);

    const isDataLoaded = (): boolean => {
        return areCollectionMoviesLoaded &&
            areSeenMoviesLoaded &&
            areWatchLaterMoviesLoaded &&
            areLikedMovieLoaded;
    };

    const userDetailCardsData: IUserDetailCardProps[] = [
        {
            text: 'Collection',
            movies: collectionMovies
        },
        {
            text: 'Subscriptions',
            movies: watchLaterMovies!
        },
        {
            text: 'Seen',
            movies: seenMovies
        },
        {
            text: 'Liked',
            movies: likedMovies!
        }
    ];

    return <div >
        <h1 className={titleClassName}>{<span style={{ color: COLOR1_D_40, marginRight: '20px' }}>{selectedUser.fullName}</span>} Information</h1>
        <div className={contentContainerClassName}>
            {
                isDataLoaded() &&
                userDetailCardsData.map((userDetailCard: IUserDetailCardProps) => {
                    return <UserInformationCard text={userDetailCard.text}
                        movies={userDetailCard.movies}
                    />
                })
            }
        </div>
    </div>
};