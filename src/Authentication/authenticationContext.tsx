import { createContext, PropsWithChildren, useState } from "react"
import { ILoginUser } from '../Models/ILoginUser';
import { IAuthentificationContext } from './authenticationContext.types';

const defaultUser: ILoginUser = {
    email: '',
    password: '',
    role: 1
};

const AuthentificationContext: React.Context<IAuthentificationContext> = createContext<IAuthentificationContext>({
    User: defaultUser,
    SetUpdatedUser: () => { },
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [user, setUser] = useState<ILoginUser>(defaultUser);

    const setUpdatedUser = (newUser: ILoginUser): void => {
        setUser(newUser);
    };

    return (<AuthentificationContext.Provider value={{ User: user!, SetUpdatedUser: setUpdatedUser, }}>
        {user !== undefined && children}</AuthentificationContext.Provider>);
}
export default AuthentificationContext;