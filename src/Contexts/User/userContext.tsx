import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react';
import { IUserContext } from './userContext.types';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';

const UserContext: React.Context<IUserContext> = createContext<IUserContext>({
    setCurrentUsers: () => { },
    users: [],
    currentUsedUsers: []
});

export const UserContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [users, setUsers] = useState<IUserProfileRead[]>([]);
    const [areUsersLoaded, setAreUsersLoaded] = useState<boolean>(false);
    const usersData: IFetchResult<IUserProfileRead[]> = useFetch<IUserProfileRead[]>(() => services.UserProfilesService.GetAllUserProfiles());
    const [currentUsedUsers, setCurrentUsedUsers] = useState<IUserProfileRead[]>([]);

    // const getDummyData = (usersData: IUserProfileRead[]): IUserProfileRead[] => {
    //     const user1: IUserProfileRead = usersData[0];
    //     const userProfiles1: IUserProfileRead[] = Array(10).fill(user1);
    //     const user2: IUserProfileRead = usersData[0];
    //     user2.fullName = "Stancu 2";
    //     const userProfiles2: IUserProfileRead[] = Array(10).fill(user2);
    //     return userProfiles1.concat(userProfiles2);
    // };

    useEffect(() => {
        if (usersData.isLoading) {
            return;
        }
        if (usersData.errors !== '' ||
            usersData.data === null ||
            usersData.data?.Error !== undefined ||
            usersData.data?.Data === undefined) {
            return;
        }
        setUsers((usersData.data.Data));
        setAreUsersLoaded(true);
    }, [usersData]);


    const setCurrentUsers = (users: IUserProfileRead[]): void => {
        setCurrentUsedUsers(users);
    };

    return (<UserContext.Provider value={{
        users,
        currentUsedUsers,
        setCurrentUsers
    }}> {areUsersLoaded && children} </UserContext.Provider>);
};

export default UserContext;