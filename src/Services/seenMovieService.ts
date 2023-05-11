import { APIHelper } from '../Configuration/apiHelper';
import { MonthlyAppUsageModel } from '../Models/IMonthlyAppUsage';
import { IResponse } from '../Models/IResponse';
import { ITopGenreModel } from '../Models/ITopGenreModel';
import { ISeenMovieCreate } from '../Models/SeenMovie/ISeenMovieCreate';
import { ISeenMovieRead } from '../Models/SeenMovie/ISeenMovieRead';
import BaseService from './baseService';

export default class SeenMoviesService extends BaseService<ISeenMovieRead | ISeenMovieCreate>  {
    async GetByUserAndMovie(movieUid: string): Promise<IResponse<ISeenMovieRead>> {
        return await APIHelper.request(`${this._endpoint}/movie/user/${movieUid}`, 'GET')
    };

    async GetMonthlySeenMovies(): Promise<IResponse<MonthlyAppUsageModel[]>> {
        return await APIHelper.request(`${this._endpoint}/monthlyMovies`, 'GET')
    };

    async GetTopSeenGenres(): Promise<IResponse<ITopGenreModel[]>> {
        return await APIHelper.request(`${this._endpoint}/topSeenGenres`, 'GET')
    };
};