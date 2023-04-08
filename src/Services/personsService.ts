import { APIHelper } from '../Configuration/apiHelper';
import { IPerson } from '../Models/IPerson';
import { IResponse } from '../Models/IResponse';
import BaseService from './baseService';

export default class PersonsService extends BaseService<IPerson>  {
    async GetAllByMovieUid(movieUid: string): Promise<IResponse<IPerson[]>> {
        return await APIHelper.request(`${this._endpoint}/${'movie'}/${movieUid}`, 'GET')
    };
    async GetPaginatedPersonsByProfession(profession: string, pageNumber: number): Promise<IResponse<IPerson[]>> {
        return await APIHelper.request(`${this._endpoint}/${'profession'}/${profession}/${pageNumber}`, 'GET')
    };
};