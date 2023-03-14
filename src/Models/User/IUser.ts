import { ISurveyAnswer } from '../ISurveyAnswer';

export interface IUser {
    uid?: string;
    email: string;
    password: string;
    role: number;
    refreshTokenExpiryTime: Date;
    refreshToken: string;
    surveyAnswers?: ISurveyAnswer[];
};