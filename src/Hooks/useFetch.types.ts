import { IResponse } from "../models/IResponse";

export interface IFetchResult<T> {
    data: IResponse<T> | null;
    isLoading: boolean;
    errors: string;
}