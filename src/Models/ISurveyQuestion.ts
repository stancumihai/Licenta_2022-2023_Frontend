import { ISurveyAnswer } from './ISurveyAnswer';

export interface ISurveyQuestion {
    Uid: string;
    Value: string;
    SurveyAnswers?: ISurveyAnswer[];
};