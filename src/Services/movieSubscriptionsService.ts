import { APIHelper } from '../Configuration/apiHelper';
import { IMovie } from '../Models/IMovie';
import { IResponse } from '../Models/IResponse';
import { IMovieSubscriptionCreate } from '../Models/MovieSubscription/IMovieSubscriptionCreate';
import { IMovieSubscriptionRead } from '../Models/MovieSubscription/IMovieSubscriptionRead';
import BaseService from './baseService';

export default class MovieSubscriptionsService extends BaseService<IMovieSubscriptionRead | IMovieSubscriptionCreate>  {
    async GetByUserAndMovie(movieUid: string): Promise<IResponse<IMovieSubscriptionRead>> {
        return await APIHelper.request(`${this._endpoint}/movie/user/${movieUid}`, 'GET')
    };

    async GetAllByUser(userUid: string): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET')
    };
};