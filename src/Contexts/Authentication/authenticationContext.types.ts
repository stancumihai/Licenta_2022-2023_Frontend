import { IUser } from '../../Models/User/IUser';

export interface IAuthentificationContext {
    User: IUser,
    HasNotifications: boolean,
    SetUpdatedUser: (newUser: IUser) => void,
    IsAuthenticated: () => boolean
    IsLoading: () => boolean;
    IsForbidden: () => boolean | undefined;
    SetUpdatedNotifications: (hasNotification: boolean) => void;
    UserHasSurveyAnswers: boolean | undefined
    setUserHasSurveyAnswersStatus: (status: boolean | undefined) => void;
};