import { APIHelper } from '../Configuration/apiHelper';
import { IMovie } from '../Models/IMovie';
import { IResponse } from '../Models/IResponse';
import { ISurveyUserAnswer } from '../Models/ISurveyUserAnswer';
import { ISurveyUserAnswerBatch } from '../Models/ISurveyUserAnswerBatch';
import { IRecommendationRead } from '../Models/Recommendation/IRecommendationRead';
import BaseService from './baseService';

export default class SurveyUserAnswerService extends BaseService<ISurveyUserAnswer | ISurveyUserAnswerBatch>  {
    async AddInSuperBatches(surveyUserAnswerBatch: ISurveyUserAnswerBatch): Promise<IResponse<IRecommendationRead[]>> {
        return await APIHelper.request(`${this._endpoint}/batch`, 'POST', surveyUserAnswerBatch)
    };
};