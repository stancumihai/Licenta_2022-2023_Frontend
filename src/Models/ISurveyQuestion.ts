import { SurveyQuestionCategory } from '../Enums/SurveyQuestionCategory';
import { SurveyQuestionType } from '../Enums/SurveyQuestionType';
import { ISurveyAnswer } from './ISurveyAnswer';

export interface ISurveyQuestion {
    uid?: string;
    value: string;
    surveyAnswers?: ISurveyAnswer[];
    Type?: SurveyQuestionType;
    category: SurveyQuestionCategory
};