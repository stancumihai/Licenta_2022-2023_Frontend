import { APIHelper } from '../Configuration/apiHelper'
import { IAccuracyPeriodModel } from '../Models/IAccuracyPeriodModel'
import { IResponse } from '../Models/IResponse'
import { IRecommendationRead } from '../Models/Recommendation/IRecommendationRead'
import { IRecommendationUpdate } from '../Models/Recommendation/IRecommendationUpdate'
import BaseService from './baseService'

export default class RecommendationsService extends BaseService<IRecommendationRead | IRecommendationUpdate>  {

    async GetAccuracyByUser(userUid: string): Promise<IResponse<IRecommendationRead[]>> {
        return await APIHelper.request(`${this._endpoint}/accuracy/${userUid}`, 'GET')
    };

    async GetAccuracyPerMonths(): Promise<IResponse<IAccuracyPeriodModel[]>> {
        return await APIHelper.request(`${this._endpoint}/accuracy/perMonths`, 'GET')
    };
};