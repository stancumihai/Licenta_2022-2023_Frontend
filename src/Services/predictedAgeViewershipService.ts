import { APIHelper } from '../Configuration/apiHelper';
import { IAgeViewershipModel } from '../Models/ChartModels/IAgeViewershipModel';
import { IResponse } from '../Models/IResponse';
import { IPredictedAgeViewership } from '../Models/MachineLearning/IPredictedAgeViewership';
import BaseService from './baseService';

export default class PredictedAgesViewershipService extends BaseService<IPredictedAgeViewership>  {
    async GetByMonth(year: number, month: number): Promise<IResponse<IAgeViewershipModel[]>> {
        return await APIHelper.request(`${this._endpoint}/${year}/${month}`, 'GET')
    };
};