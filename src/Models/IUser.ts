import { ISurveyAnswer } from './ISurveyAnswer';

export interface IUser {
    Uid?: string;
    Username: string;
    Email: string;
    Password: string;
    Role: number;
    SurveyAnswers?: ISurveyAnswer[];
};