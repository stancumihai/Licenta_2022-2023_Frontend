import { ITokenUser } from '../Models/ITokenUser';

export interface IAuthentificationContext {
    User: ITokenUser,
    SetUpdatedUser: (newUser: ITokenUser) => void,
    IsAuthenticated: () => boolean
};