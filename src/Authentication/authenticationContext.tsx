import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { ServiceContext, ServiceContextInstance } from '../Core/serviceContext';
import { useFetch } from '../Hooks/useFetch';
import { IFetchResult } from '../Hooks/useFetch.types';
import { IUser } from '../Models/User/IUser';
import { IAuthentificationContext } from './authenticationContext.types';
import Cookies from 'universal-cookie';
import { REFRESH_TOKEN } from '../Library/constants';

const defaultUser: IUser = {
    email: '',
    password: '',
    role: 1,
    refreshToken: '',
    refreshTokenExpiryTime: new Date(),
};

const AuthentificationContext: React.Context<IAuthentificationContext> = createContext<IAuthentificationContext>({
    User: defaultUser,
    HasNotifications: false,
    SetUpdatedUser: () => { },
    IsAuthenticated: () => { return false; },
    IsLoading: () => { return false; },
    IsForbidden: () => { return false; },
    setUpdatedNotifications: () => { }
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<IUser>(defaultUser);
    const [hasNotifications, setHasNotifications] = useState<boolean>();
    const cookies = new Cookies();

    const authenticatedUserFetchResult: IFetchResult<IUser> = useFetch(services.AuthenticationService.GetLoggedInUser);
    const forbidden: boolean | undefined = authenticatedUserFetchResult.data?.Status === undefined ?
        undefined :
        authenticatedUserFetchResult.data?.Status === 401;

    useEffect(() => {
        if (authenticatedUserFetchResult.isLoading) {
            return;
        }
        if (authenticatedUserFetchResult.errors !== "" ||
            authenticatedUserFetchResult.data?.Error !== undefined ||
            authenticatedUserFetchResult.data == null ||
            authenticatedUserFetchResult.data.Data === undefined) {
            return;
        }
        setUser(authenticatedUserFetchResult.data!.Data!);
        if (!forbidden && authenticatedUserFetchResult.data!.Data!.refreshToken !== "") {
            cookies.set(REFRESH_TOKEN, authenticatedUserFetchResult.data!.Data!.refreshToken)
        }
    }, [authenticatedUserFetchResult]);

    const isLoading = (): boolean => {
        return authenticatedUserFetchResult.isLoading === true;
    };

    const setUpdatedUser = (newUser: IUser): void => {
        setUser(newUser);
    };

    const isForbidden = (): boolean | undefined => {
        return forbidden === true && !isLoading();
    };

    const isAuthenticated = (): boolean => {
        return user!.email !== defaultUser.email &&
            user!.password !== defaultUser.password;
    };

    const setUpdatedNotifications = (hasNotifications: boolean): void => {
        setHasNotifications(hasNotifications);
    };

    return (<AuthentificationContext.Provider value={{
        User: user!,
        HasNotifications: hasNotifications!,
        SetUpdatedUser: setUpdatedUser,
        IsAuthenticated: isAuthenticated,
        IsLoading: isLoading,
        IsForbidden: isForbidden,
        setUpdatedNotifications: setUpdatedNotifications
    }}>
        {user !== undefined && children}</AuthentificationContext.Provider>);
}
export default AuthentificationContext;