import { APIHelper } from '../Configuration/apiHelper';
import { IMovie } from '../Models/IMovie';
import { IResponse } from '../Models/IResponse';
import BaseService from './baseService';

export default class MoviesService extends BaseService<IMovie>  {
    async GetMoviesByGenre(genre: string, pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/${'genres'}/${genre}/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMovieGenres(): Promise<IResponse<string[]>> {
        return await APIHelper.request(`${this._endpoint}/${'genres'}`, 'GET')
    };
};