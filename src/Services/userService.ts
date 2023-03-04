import { APIHelper } from '../Configuration/apiHelper';
import { IAuthUser } from '../Models/IAuthUser';
import { IResponse } from '../Models/IResponse';
import { IUser } from '../Models/IUser';
import BaseService from './baseService';

export default class UsersService extends BaseService<IUser>  {
    async GetByEmail(email: string): Promise<IResponse<IAuthUser>> {
        return await APIHelper.request(`${this._endpoint}/${'email'}/${email}`, 'GET')
    }
};