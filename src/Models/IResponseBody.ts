import { Methods } from "../Enums/methods";

export default interface IResponseBody {
    method: Methods,
    headers: HeadersInit,
    body?: BodyInit | null,
};