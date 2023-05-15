import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';

export interface IUserContext {
    users: IUserProfileRead[];
    setCurrentUsers: (users: IUserProfileRead[]) => void;
    currentUsedUsers: IUserProfileRead[];
};