import { APIHelper } from '../Configuration/apiHelper'
import { IAccuracyPeriodModel } from '../Models/IAccuracyPeriodModel'
import { IMonthlyRecommendationStatusModel } from '../Models/IMonthlyRecommendationStatusModel'
import { IResponse } from '../Models/IResponse'
import { ISummaryMonthlyStatistics } from '../Models/ISummaryMonthlyStatistics'
import { IRecommendationRead } from '../Models/Recommendation/IRecommendationRead'
import { IRecommendationUpdate } from '../Models/Recommendation/IRecommendationUpdate'
import BaseService from './baseService'

export default class RecommendationsService extends BaseService<IRecommendationRead | IRecommendationUpdate>  {

    async GetAccuracyByUser(userUid: string): Promise<IResponse<IRecommendationRead[]>> {
        return await APIHelper.request(`${this._endpoint}/accuracy/${userUid}`, 'GET')
    };

    async GetAccuracyPerMonthsByAlgorithm(algorithmName: string): Promise<IResponse<IAccuracyPeriodModel[]>> {
        return await APIHelper.request(`${this._endpoint}/accuracy/perMonths/${algorithmName}`, 'GET')
    };

    async GetMonthlyRecommendationStatuses(year: number, month: number, algorithmName: string): Promise<IResponse<IMonthlyRecommendationStatusModel[]>> {
        return await APIHelper.request(`${this._endpoint}/accuracy/monthlyStatus/${year}/${month}/${algorithmName}`, 'GET')
    };

    async GetMonthlySummaries(): Promise<IResponse<ISummaryMonthlyStatistics[]>> {
        return await APIHelper.request(`${this._endpoint}/monthlySummaries`, 'GET')
    };
};