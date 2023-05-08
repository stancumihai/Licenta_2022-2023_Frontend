import { IUser } from '../Models/User/IUser';

export interface IAuthentificationContext {
    User: IUser,
    HasNotifications: boolean,
    SetUpdatedUser: (newUser: IUser) => void,
    IsAuthenticated: () => boolean
    IsLoading: () => boolean;
    IsForbidden: () => boolean | undefined;
    setUpdatedNotifications: (hasNotification: boolean) => void
};