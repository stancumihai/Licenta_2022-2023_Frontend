import { APIHelper } from '../Configuration/apiHelper';
import { IResponse } from '../Models/IResponse';
import { IUserProfileCreate } from '../Models/UserProfile/IUserProfileCreate';
import { IUserProfileRead } from '../Models/UserProfile/IUserProfileRead';
import { IUserProfileUpdate } from '../Models/UserProfile/IUserProfileUpdate';
import BaseService from './baseService';

export default class UserProfilesService extends BaseService<IUserProfileRead | IUserProfileCreate | IUserProfileUpdate>  {
    async GetByUserUid(userUid: string): Promise<IResponse<IUserProfileRead>> {
        return await APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET')
    };
};