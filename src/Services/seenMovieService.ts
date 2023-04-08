import { APIHelper } from '../Configuration/apiHelper';
import { IResponse } from '../Models/IResponse';
import { ISeenMovieCreate } from '../Models/SeenMovie/ISeenMovieCreate';
import { ISeenMovieRead } from '../Models/SeenMovie/ISeenMovieRead';
import BaseService from './baseService';

export default class SeenMoviesService extends BaseService<ISeenMovieRead | ISeenMovieCreate>  {
    async GetByUserAndMovie(movieUid: string): Promise<IResponse<ISeenMovieRead>> {
        return await APIHelper.request(`${this._endpoint}/movie/user/${movieUid}`, 'GET')
    };
};