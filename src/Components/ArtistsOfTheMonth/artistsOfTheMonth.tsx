import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IPerson } from '../../Models/IPerson';
import { PersonDetailsCard } from '../PersonDetailsCard/personDetailsCard';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { UserType } from '../../Enums/UserType';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import { containerClassName, contentContainerClassName, gridContainerClassName } from './artistsOfTheMonth.styles';

export const ArtistsOfTheMonth = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const personsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAristsOfTheMonth());
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [arePersonsLoaded, setArePersonsLoaded] = useState<boolean>(false);
    const uiContext: IUiContext = useContext(UiContext);
    const userContext: IUserContext = useContext(UserContext);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);

    useEffect(() => {
        if (personsData.isLoading) {
            return;
        }
        if (personsData.errors !== "" ||
            personsData.data?.Error !== undefined ||
            personsData.data == null ||
            personsData.data.Data === undefined) {
            return;
        }
        setPersons(personsData.data!.Data!);
        setTimeout(() => {
            setArePersonsLoaded(true);
        }, 2000)
    }, [personsData]);

    useEffect(() => {
        if (!currentUserHasProfile()) {
            return;
        }
        if (!arePersonsLoaded) {
            uiContext.setSpinnerState(true, 5000);
        }
    }, [arePersonsLoaded]);

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();;
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    return <div className={containerClassName}>
        {!arePersonsLoaded || !currentUserHasProfile() ?
            <>
            </> :
            <div className={gridContainerClassName}>
                <div className={contentContainerClassName}>
                    {persons.map((p: IPerson, i: number) => <PersonDetailsCard key={i} person={p} />)}
                </div>
            </div>
        }
    </div>
};