import { ILoginUser } from '../Models/ILoginUser';

export interface IAuthentificationContext {
    User: ILoginUser,
    SetUpdatedUser: (newUser: ILoginUser) => void
};