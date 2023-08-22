import Cookies  from 'js-cookie';
import { InternalAxiosRequestConfig, AxiosResponse } from './../../node_modules/axios/index.d';
import axios from "axios";

type ApiRequestBodyType = {
    method : string,
    url : string,
    params? : object
    token? : string
}

export const ApiRequest = async <T>(value : ApiRequestBodyType) : Promise<AxiosResponse<T> | undefined> => {
    let result,
        responseType,
        parameter
    const path :string = import.meta.env.VITE_SS_URL;

    const userToken = Cookies.get('token') ??  value.token;

    axios.interceptors.request.use((config:InternalAxiosRequestConfig ) => {
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
        
        if(userToken !== undefined)
        {
        config.headers['Authorization'] = `Bearer ${userToken}`;   
        }
        return config;
    });

    if (
        value.method === "post" ||
        value.method === "patch" ||
        value.method === "put" ||
        value.method === "delete"
    ) {
        parameter = {
            baseURL: path,
            method: value.method,
            url: value.url,
            data: value.params,
        };
    } else {
        parameter = {
            baseURL: path,
            method: value.method,
            url: value.url,
            params: value.params,
            responseType,
        };
    }
    // calling api
    await axios(parameter)
        .then((response) => {
            result = response;
        })
        .catch((err) => (result = err));
    // console.log(result);
    return result;
}