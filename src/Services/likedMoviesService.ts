import { APIHelper } from '../Configuration/apiHelper';
import { ILikedMovieRead } from '../Models/LikedMovie/ILikedMovieRead';
import { IResponse } from '../Models/IResponse';
import BaseService from './baseService';
import { ILikedMovieCreate } from '../Models/LikedMovie/ILikedMovieCreate';
import { IMovie } from '../Models/IMovie';

export default class LikedMoviesService extends BaseService<ILikedMovieRead | ILikedMovieCreate>  {
    async GetAllByUser(userUid: string): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET')
    };
    async GetByUserAndMovie(movieUid: string): Promise<IResponse<ILikedMovieRead>> {
        return await APIHelper.request(`${this._endpoint}/movie/user/${movieUid}`, 'GET')
    };
};