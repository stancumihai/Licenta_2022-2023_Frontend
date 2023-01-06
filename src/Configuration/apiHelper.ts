import { Methods } from '../Enums/methods';
import { IResponse } from '../Models/IResponse';
import IResponseBody from '../Models/IResponseBody';
import BASE_URL from './config.json'

class ApiHelper {

    request = async<T,>(endpoint: string, method: Methods, body?: T): Promise<IResponse<T>> => {
        try {
            const responseBody: IResponseBody = {
                method: method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            }
            if (method !== 'GET' || 'DELETE') {
                responseBody.body = JSON.stringify(body);
            }
            
            const response: Response = await fetch(`${BASE_URL.BASE_URL}${endpoint}`, responseBody);

            if (response.status === 204) {
                return { Status: response.status };
            }

            if(response.status !==200)
                {
                const status: number = response.status;
                if (status === 400) {
                    return { Status: status, Error: 'Bad Request' };
                }
                if (status === 401) {
                    return { Status: status, Error: 'Unauthorized' };
                }
                if (status === 404) {
                    return { Status: status, Error: 'Not Found' };
                }
                if(status === 500) {
                    return { Status: status, Error: 'Server Error' };
                }
            }
                
            const data = await response.json();
            return { Data: data, Status: response.status };

        } catch (error) {            
            return { Error: error as string }
        }
    };
};

export const APIHelper = new ApiHelper();