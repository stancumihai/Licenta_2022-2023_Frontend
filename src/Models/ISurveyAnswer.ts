import { IUser } from './IUser';

export interface ISurveyAnswer {
    Uid: string;
    SurveyQuestionGuid: string;
    Users: IUser[];
    Value: string;
};