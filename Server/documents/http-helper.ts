import { BASE_URL } from "@/config/env-helper";
import axios, { AxiosRequestConfig } from "axios";
import { onError, onRequest, onResponse } from "./http-intercepter";
import { ApiResponse } from "@/api/response-type/ApiResponse";

const baseConfig: AxiosRequestConfig = {
    baseURL: BASE_URL
}
const Axios = axios.create(baseConfig);

Axios.interceptors.request.use(onRequest, onError);
Axios.interceptors.response.use(onResponse, onError);

interface HttpPostParam {
    path: string,
    pathVariable?: string | number | boolean | null
    queryParams?: any,
    body: any,
    abortController?: any
}

interface HttpGetParam {
    path: string,
    queryParams?: any,
    abortController?: any
}

interface HttpPutParam {
    path: string,
    pathVariable?: string | number | boolean | null,
    queryParams?: any,
    body: any,
    abortController?: any
}

interface HttpDeleteParam {
    path: string,
    pathVariable?: string | number | boolean | null,
    queryParams?: any,
    abortController?: any
}

const get = ({ path, queryParams = null, abortController = undefined }: HttpGetParam): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
        Axios.get(path,
            {
                params: queryParams,
                signal: abortController
            })
            .then((res) => {
                const response = new ApiResponse(res)
                if (response.isSuccess) return resolve(response)
                return reject(response)
            })
            .catch(e => reject(e))
    })

}

const post = ({ path, pathVariable = null, queryParams = null, body = null, abortController = undefined }: HttpPostParam): Promise<ApiResponse> => {

    if (pathVariable !== null) path = path + `/${pathVariable}`

    return new Promise((resolve, reject) => {
        Axios.post(path, body,
            {
                params: queryParams,
                signal: abortController
            })
            .then((res) => {
                const response = new ApiResponse(res)
                if (response.isSuccess) return resolve(response)
                return reject(response)
            })
            .catch(e => reject(e))
    })
}

const put = ({ path, pathVariable = null, queryParams = null, body = null, abortController = undefined }: HttpPutParam): Promise<ApiResponse> => {
    if (pathVariable !== null) path = path + `/${pathVariable}`;

    return new Promise((resolve, reject) => {
        Axios.put(path, body, {
            params: queryParams,
            signal: abortController
        })
            .then((res) => {
                const response = new ApiResponse(res);
                if (response.isSuccess) return resolve(response);
                return reject(response);
            })
            .catch(e => reject(e));
    });
}

const del = ({ path, pathVariable = null, queryParams = null, abortController = undefined }: HttpDeleteParam): Promise<ApiResponse> => {
    if (pathVariable !== null) path = path + `/${pathVariable}`;

    return new Promise((resolve, reject) => {
        Axios.delete(path, {
            params: queryParams,
            signal: abortController
        })
            .then((res) => {
                const response = new ApiResponse(res);
                if (response.isSuccess) return resolve(response);
                return reject(response);
            })
            .catch(e => reject(e));
    });
}

export const HttpClient = {
    get, post, delete: del, put
}