import { APIHelper } from '../Configuration/apiHelper';
import { IResponse } from '../Models/IResponse';
import { ISurveyAnswer } from '../Models/ISurveyAnswer';
import BaseService from './baseService';

export default class SurveyAnswersService extends BaseService<ISurveyAnswer>  {
    async GetAllByQuestionUid(questionUid: string): Promise<IResponse<ISurveyAnswer[]>> {
        return await APIHelper.request(`${this._endpoint}/${'question'}/${questionUid}`, 'GET')
    }
};