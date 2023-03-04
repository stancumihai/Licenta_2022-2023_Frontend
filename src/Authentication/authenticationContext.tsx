import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { ServiceContext, ServiceContextInstance } from '../Core/serviceContext';
import { useFetch } from '../Hooks/useFetch';
import { IFetchResult } from '../Hooks/useFetch.types';
import { ITokenUser } from '../Models/ITokenUser';
import { IAuthentificationContext } from './authenticationContext.types';

const defaultUser: ITokenUser = {
    email: '',
    password: '',
    role: 1,
    tokenCreated: new Date(),
    tokenExpires: new Date(),
    refreshToken: ''
};

const AuthentificationContext: React.Context<IAuthentificationContext> = createContext<IAuthentificationContext>({
    User: defaultUser,
    SetUpdatedUser: () => { },
    IsAuthenticated: () => { return false; }
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<ITokenUser | undefined>(defaultUser);

    const authenticatedUserFetchResult: IFetchResult<ITokenUser> = useFetch(services.AuthenticationService.GetLoggedInUser);

    useEffect(() => {
        if (authenticatedUserFetchResult.errors === "" && !authenticatedUserFetchResult.isLoading && authenticatedUserFetchResult.data?.Data !== undefined) {
            setUser(authenticatedUserFetchResult.data.Data);
        }
    }, [authenticatedUserFetchResult]);

    const setUpdatedUser = (newUser: ITokenUser): void => {
        setUser(newUser);
    };

    const isAuthenticated = (): boolean => {
        return user!.email !== defaultUser.email &&
            user!.password !== defaultUser.password
    };

    return (<AuthentificationContext.Provider value={{ User: user!, SetUpdatedUser: setUpdatedUser, IsAuthenticated: isAuthenticated }}>
        {user !== undefined && children}</AuthentificationContext.Provider>);
}
export default AuthentificationContext;