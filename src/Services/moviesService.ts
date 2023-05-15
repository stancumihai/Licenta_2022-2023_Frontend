import { APIHelper } from '../Configuration/apiHelper';
import { IMovie } from '../Models/IMovie';
import { IResponse } from '../Models/IResponse';
import { ISearchModel } from '../UiModels/ISearchModel';
import BaseService from './baseService';

export default class MoviesService extends BaseService<IMovie>  {
    async GetPaginatedMovies(pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMoviesByGenre(genre: string, pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/genres/${genre}/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMovieGenres(): Promise<IResponse<string[]>> {
        return await APIHelper.request(`${this._endpoint}/genres`, 'GET')
    };

    async GetMoviesHistoryPaginated(pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/history/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMoviesSubscriptionPaginated(pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/subscription/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMoviesCollectionPaginated(pageNumber: number, pageSize: number): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/collection/${pageNumber}/${pageSize}`, 'GET')
    };

    async GetMoviesHistory(): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/history`, 'GET')
    };

    async GetMoviesSubscription(): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/subscription`, 'GET')
    };

    async GetMoviesCollection(): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/collection`, 'GET')
    };

    async GetTopLikedGenres(): Promise<IResponse<string[]>> {
        return await APIHelper.request(`${this._endpoint}/topGenres`, 'GET')
    };

    async GetAllByPersonUid(personUid: string): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/person/${personUid}`, 'GET')
    };

    async GetAdvancedSearchMovieData(searchModel: ISearchModel): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/advancedSearch/`, 'POST', searchModel)
    };

    async GetAllMoviesCollectionByUser(userUid: string): Promise<IResponse<IMovie[]>> {
        return await APIHelper.request(`${this._endpoint}/collection/${userUid}`, 'GET')
    };
};  