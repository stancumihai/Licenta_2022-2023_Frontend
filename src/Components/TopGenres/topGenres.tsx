import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    containerClassName,
    contentContainerClassName,
    gridContainerClassName,
} from './topGenres.styles';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { TopGenresCard } from '../TopGenresCard/topGenresCard';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { UserType } from '../../Enums/UserType';

export const TopGenres = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetTopLikedGenres());
    const [genres, setGenres] = useState<string[]>();
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);
    const uiContext: IUiContext = useContext(UiContext);
    const userContext: IUserContext = useContext(UserContext);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);

    useEffect(() => {
        if (genresData.isLoading) {
            return;
        }
        if (genresData.errors !== "" ||
            genresData.data?.Error !== undefined ||
            genresData.data == null ||
            genresData.data.Data === undefined) {
            return;
        }
        setGenres(genresData.data!.Data!);
        setAreGenresLoaded(true);
    }, [genresData]);

    useEffect(() => {
        if (!currentUserHasProfile()) {
            return;
        }
        if (!areGenresLoaded) {
            uiContext.setSpinnerState(true, 4000);
        }
    }, [areGenresLoaded]);

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();;
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    return <div className={containerClassName}>
        {!areGenresLoaded || !currentUserHasProfile() ?
            <>
            </> :
            <div className={gridContainerClassName}>
                <div className={contentContainerClassName}>
                    {genres!.map((g: string, i: number) => <TopGenresCard
                        key={i}
                        genre={g} />)}
                </div>
            </div>
        }
    </div>
};