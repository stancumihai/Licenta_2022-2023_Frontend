export interface IResponse<T,> {
    Status?: number,
    Data?: T,
    Error?: string
};