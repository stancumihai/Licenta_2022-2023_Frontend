import { APIHelper } from '../Configuration/apiHelper';
import { IResponse } from '../Models/IResponse';
import { IUserMovieRatingCreate } from '../Models/UserMovieRating/IUserMovieRatingCreate';
import { IUserMovieRatingRead } from '../Models/UserMovieRating/IUserMovieRatingRead';
import BaseService from './baseService';

export default class UserMovieRatingsService extends BaseService<IUserMovieRatingCreate | IUserMovieRatingRead>  {
    async GetAllByLoggedUser(): Promise<IResponse<IUserMovieRatingRead>> {
        return await APIHelper.request(`${this._endpoint}/user}`, 'GET')
    };
};