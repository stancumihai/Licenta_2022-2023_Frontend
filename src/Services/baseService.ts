import { APIHelper } from "../Configuration/apiHelper";
import { IResponse } from "../Models/IResponse";

abstract class BaseService<T> {

    constructor(protected readonly _endpoint: string)  {

    }

    async GetAll(): Promise<IResponse<T[]>> {
        return await APIHelper.request(`${this._endpoint}`, 'GET')
    }

    async GetByUid(uid: string): Promise<IResponse<T>> {
        return await APIHelper.request(`${this._endpoint}/${uid}`, 'GET')
    }

    async Add(body: T): Promise<IResponse<T>> {
        return await APIHelper.request(`${this._endpoint}`, 'POST', body)
    }

    async Delete(uid: string): Promise<IResponse<T>> {
        return await APIHelper.request(`${this._endpoint}/${uid}`, 'DELETE')
    }

    async DeleteByUids(uids: string): Promise<IResponse<T>> {
        const stringUids = encodeURIComponent(uids);
        return await APIHelper.request(`${this._endpoint}/deleteByUids/${stringUids}`, 'DELETE')
    }

    async Update(body: T): Promise<IResponse<T>> {
        return await APIHelper.request(`${this._endpoint}`, 'PUT', body)
    }
}

export default BaseService