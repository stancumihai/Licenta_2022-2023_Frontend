import { IUser } from '../Models/User/IUser';

export interface IAuthentificationContext {
    User: IUser,
    SetUpdatedUser: (newUser: IUser) => void,
    IsAuthenticated: () => boolean
    IsLoading: () => boolean;
    IsForbidden: () => boolean | undefined;
};