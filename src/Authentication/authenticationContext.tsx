import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { ServiceContext, ServiceContextInstance } from '../Core/serviceContext';
import { useFetch } from '../Hooks/useFetch';
import { IFetchResult } from '../Hooks/useFetch.types';
import { IUser } from '../Models/User/IUser';
import { IAuthentificationContext } from './authenticationContext.types';

const defaultUser: IUser = {
    email: '',
    password: '',
    role: 1,
    refreshToken: '',
    refreshTokenExpiryTime: new Date(),
};

const AuthentificationContext: React.Context<IAuthentificationContext> = createContext<IAuthentificationContext>({
    User: defaultUser,
    SetUpdatedUser: () => { },
    IsAuthenticated: () => { return false; }
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<IUser | undefined>(defaultUser);

    const authenticatedUserFetchResult: IFetchResult<IUser> = useFetch(services.AuthenticationService.GetLoggedInUser);

    useEffect(() => {
        if (authenticatedUserFetchResult.errors === "" && !authenticatedUserFetchResult.isLoading && authenticatedUserFetchResult.data?.Data !== undefined) {
            setUser(authenticatedUserFetchResult.data.Data);
        }
    }, [authenticatedUserFetchResult]);

    const setUpdatedUser = (newUser: IUser): void => {
        setUser(newUser);
    };

    const isAuthenticated = (): boolean => {
        return user!.email !== defaultUser.email &&
            user!.password !== defaultUser.password &&
            new Date(user!.refreshTokenExpiryTime) > new Date()
    };

    return (<AuthentificationContext.Provider value={{ User: user!, SetUpdatedUser: setUpdatedUser, IsAuthenticated: isAuthenticated }}>
        {user !== undefined && children}</AuthentificationContext.Provider>);
}
export default AuthentificationContext;