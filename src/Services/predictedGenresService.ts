import { APIHelper } from '../Configuration/apiHelper';
import { PredictedGenre } from '../Models/ChartModels/MachineLearning/PredictedGenre';
import { IResponse } from '../Models/IResponse';
import { IPredictedGenre } from '../Models/MachineLearning/IPredictedGenre';
import BaseService from './baseService';

export default class PredictedGenresService extends BaseService<IPredictedGenre>  {
    async GetEachMonthByUser(userUid: string): Promise<IResponse<PredictedGenre[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth/${userUid}`, 'GET')
    };

    async GetEachMonth(): Promise<IResponse<PredictedGenre[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth`, 'GET')
    };
};