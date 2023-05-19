import {
    useEffect,
    useState
} from "react";
import { IResponse } from "../Models/IResponse";
import { IFetchResult } from "./useFetch.types";

export const useFetch = <T>(fetchPromise: () => Promise<IResponse<T>>, dependencies: string[] = []): IFetchResult<T> => {
    const [fetchData, setFetchData] = useState<IFetchResult<T>>(
        {
            data: null,
            isLoading: true,
            errors: ""
        }
    )

    useEffect(() => {
        fetchPromise()
            .then((response: IResponse<T>) =>
                setFetchData(prevFetchData => {
                    return {
                        ...prevFetchData,
                        data: response
                    };
                })
            )
            .catch((error: string) =>
                setFetchData(prevFetchData => {
                    return {
                        ...prevFetchData,
                        errors: error
                    };
                })
            )
            .finally(() =>
                setFetchData(prevFetchData => {
                    return {
                        ...prevFetchData,
                        isLoading: false
                    };
                })
            )

    }, dependencies);

    return fetchData;
};