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
    SetUpdatedUser: () => { },
    IsAuthenticated: () => { return false; },
    IsLoading: () => { return false; },
    IsForbidden: () => { return false; },
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<IUser>(defaultUser);
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

    // if (forbidden === true && !isLoading() &&
    //     cookies.get(REFRESH_TOKEN) !== undefined &&
    //     window.location.href !== "http://localhost:3000/login") {
    //     if (authenticatedUserFetchResult.data?.Data?.refreshToken === "") {
    //         setUser(defaultUser);
    //     }
    //     const tokenModel: ITokenModel = {
    //         refreshToken: cookies.get(REFRESH_TOKEN),
    //         accessToken: cookies.get(JWT_TOKEN)
    //     };
    //     services.AuthenticationService.RefreshToken(tokenModel).then((data: IResponse<ITokenModel>) => {
    //         cookies.set(REFRESH_TOKEN, data.Data!.refreshToken);
    //         cookies.set(JWT_TOKEN, data.Data!.accessToken)
    //     });
    // }

    const isForbidden = (): boolean | undefined => {
        return forbidden === true && !isLoading();
    }

    const isAuthenticated = (): boolean => {
        return user!.email !== defaultUser.email &&
            user!.password !== defaultUser.password;
    };

    return (<AuthentificationContext.Provider value={{
        User: user!,
        SetUpdatedUser: setUpdatedUser,
        IsAuthenticated: isAuthenticated,
        IsLoading: isLoading,
        IsForbidden: isForbidden
    }}>
        {user !== undefined && children}</AuthentificationContext.Provider>);
}
export default AuthentificationContext;