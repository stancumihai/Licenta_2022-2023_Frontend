import { APIHelper } from '../Configuration/apiHelper';
import { PredictedMovieRuntime } from '../Models/ChartModels/MachineLearning/PredictedMovieRuntime';
import { IResponse } from '../Models/IResponse';
import { IPredictedMovieRuntime } from '../Models/MachineLearning/IPredictedMovieRuntime';
import BaseService from './baseService';

export default class PredictedMoviesRuntimeService extends BaseService<IPredictedMovieRuntime>  {
    async GetEachMonthByUser(userUid: string): Promise<IResponse<PredictedMovieRuntime[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth/${userUid}`, 'GET')
    };

    async GetEachMonth(): Promise<IResponse<PredictedMovieRuntime[]>> {
        return await APIHelper.request(`${this._endpoint}/eachMonth`, 'GET')
    };
};