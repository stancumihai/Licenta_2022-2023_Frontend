import { APIHelper } from '../Configuration/apiHelper';
import { IMovieRating } from '../Models/IMovieRating';
import { IResponse } from '../Models/IResponse';
import BaseService from './baseService';

export default class MovieRatingsService extends BaseService<IMovieRating>  {
    async GetByMovieUid(movieUid: string): Promise<IResponse<IMovieRating>> {
        return await APIHelper.request(`${this._endpoint}/${'movie'}/${movieUid}`, 'GET')
    };
};