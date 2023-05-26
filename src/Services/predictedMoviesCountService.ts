
import { APIHelper } from '../Configuration/apiHelper';
import { PredictedMovieCount } from '../Models/ChartModels/MachineLearning/PredictedMovieCount';
import { IResponse } from '../Models/IResponse';
import { IPredictedMovieCount } from '../Models/MachineLearning/IPredictedMovieCount';
import BaseService from './baseService';

export default class PredictedMoviesCountService extends BaseService<IPredictedMovieCount>  {
    async GetEachMonthByUser(userUid: string): Promise<IResponse<PredictedMovieCount[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth/${userUid}`, 'GET')
    };

    async GetEachMonth(): Promise<IResponse<PredictedMovieCount[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth`, 'GET')
    };
};