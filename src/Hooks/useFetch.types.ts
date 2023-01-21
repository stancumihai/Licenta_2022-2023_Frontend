import { IResponse } from "../Models/IResponse";

export interface IFetchResult<T> {
    data: IResponse<T> | null;
    isLoading: boolean;
    errors: string;
}