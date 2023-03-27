import { APIHelper } from '../Configuration/apiHelper';
import {
    GET_LOGGED_USER_ENDPOINT,
    LOGIN_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
    REGISTER_ENDPOINT,
    RENEWPASSWORD_ENDPOINT,
    SENDEMAIL_ENDPOINT
} from '../Library/constants';
import { ILoginUser } from '../Models/User/ILoginUser';
import { IResponse } from '../Models/IResponse';
import { IUser } from '../Models/User/IUser';
import { IRenewPassword } from '../Models/IRenewPassword';
import { IRegisterUser } from '../Models/User/IRegisterUser';
import { ITokenModel } from '../Models/User/ITokenModel';

export default class AuthenticationService {
    async Login(user: ILoginUser): Promise<IResponse<ILoginUser>> {
        return await APIHelper.request(LOGIN_ENDPOINT, 'POST', user);
    };

    async Register(user: IRegisterUser): Promise<IResponse<IRegisterUser>> {
        return await APIHelper.request(REGISTER_ENDPOINT, 'POST', user);
    };

    async GetLoggedInUser(): Promise<IResponse<IUser>> {
        return await APIHelper.request(GET_LOGGED_USER_ENDPOINT, 'GET');
    };

    async Logout(): Promise<IResponse<ILoginUser>> {
        return await APIHelper.request(REFRESH_TOKEN_ENDPOINT, 'POST');
    };

    async RefreshToken(tokenModel: ITokenModel): Promise<IResponse<ITokenModel>> {
        return await APIHelper.request(REFRESH_TOKEN_ENDPOINT, 'POST', tokenModel);
    };

    async SendEmail(email: string): Promise<IResponse<string>> {
        return await APIHelper.request(`${SENDEMAIL_ENDPOINT}/${email}`, 'POST', email);
    };

    async RenewPassword(renewPassword: IRenewPassword): Promise<IResponse<IRenewPassword>> {
        return await APIHelper.request(`${RENEWPASSWORD_ENDPOINT}`, 'PUT', renewPassword);
    };
};