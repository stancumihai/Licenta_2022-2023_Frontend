import { ISurveyAnswer } from './ISurveyAnswer';

export interface IUser {
    Uid?: string;
    Email: string;
    Password: string;
    Role: number;
    SurveyAnswers?: ISurveyAnswer[];
};