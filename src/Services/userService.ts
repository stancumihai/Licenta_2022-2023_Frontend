import { APIHelper } from '../Configuration/apiHelper';
import { IResponse } from '../Models/IResponse';
import { IUser } from '../Models/User/IUser';
import BaseService from './baseService';

export default class UsersService extends BaseService<IUser>  {
    async GetByEmail(email: string): Promise<IResponse<IUser>> {
        return await APIHelper.request(`${this._endpoint}/${'email'}/${email}`, 'GET')
    }
};