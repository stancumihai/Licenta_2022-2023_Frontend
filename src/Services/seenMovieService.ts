import { APIHelper } from '../Configuration/apiHelper';
import { MonthlyAppUsageModel } from '../Models/IMonthlyAppUsage';
import { IMovie } from '../Models/IMovie';
import { IResponse } from '../Models/IResponse';
import { ITopGenreModel } from '../Models/ITopGenreModel';
import { ISeenMovieCreate } from '../Models/SeenMovie/ISeenMovieCreate';
import { ISeenMovieRead } from '../Models/SeenMovie/ISeenMovieRead';
import BaseService from './baseService';

export default class SeenMoviesService extends BaseService<ISeenMovieRead | ISeenMovieCreate>  {
    async GetByUserAndMovie(movieUid: string): Promise<IResponse<ISeenMovieRead>> {
        return await APIHelper.request(`${this._endpoint}/movie/user/${movieUid}`, 'GET')
    };

    async GetMonthlySeenMoviesByUser(): Promise<IResponse<MonthlyAppUsageModel[]>> {
        return await APIHelper.request(`${this._endpoint}/user/monthlyMovies`, 'GET')
    };

    async GetTopSeenGenresByUser(): Promise<IResponse<ITopGenreModel[]>> {
        return await APIHelper.request(`${this._endpoint}/user/topSeenGenres`, 'GET')
    };

    async GetMonthlySeenMovies(): Promise<IResponse<MonthlyAppUsageModel[]>> {
        return await APIHelper.request(`${this._endpoint}/monthlyMovies`, 'GET')
    };

    async GetTopSeenGenres(): Promise<IResponse<ITopGenreModel[]>> {
        return await APIHelper.request(`${this._endpoint}/topSeenGenres`, 'GET')
    };

    async GetAllByUser(userUid: string): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET')
    };
};