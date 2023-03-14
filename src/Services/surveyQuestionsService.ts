import { APIHelper } from '../Configuration/apiHelper';
import { SURVEY_QUESTIONS_ENDPONT } from '../Library/constants';
import { IResponse } from '../Models/IResponse';
import { ISurveyQuestion } from '../Models/ISurveyQuestion';
import BaseService from './baseService';

export default class SurveyQuestionsService extends BaseService<ISurveyQuestion>  {
    async GetGuidBySurveyAnswerGuid(surveyAnswerUid: string): Promise<IResponse<string>> {
        return await APIHelper.request(SURVEY_QUESTIONS_ENDPONT + `/surveyAnswerGuid/${surveyAnswerUid}`, 'GET');
    };
};