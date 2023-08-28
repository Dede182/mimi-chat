import Cookies  from 'js-cookie';
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from './../../node_modules/axios/index.d';
import axios from "axios";

type ApiRequestBodyType = {
    method : string,
    url : string,
    params? : object | string,
    token? : string
    responseType? : string
}

axios.interceptors.request.use((config : InternalAxiosRequestConfig) => {
    config.headers["Accept"] = "application/json";
    
    const userToken = Cookies.get('token'); // Assuming Cookies is imported and available
    if (userToken !== undefined) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    
    if (config.method === "post") {
        config.headers['Content-Type'] = 'multipart/form-data';
        //check url has download words 
        if(config.url?.includes('download'))
        {
            config.responseType = 'blob';
        }
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export const ApiRequest = async <T>(value : ApiRequestBodyType) : Promise<AxiosResponse<T> | undefined> => {
    let result,
        parameter
    const path :string = import.meta.env.VITE_SS_URL;
  
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

        };
    }
    // calling api
    await axios(parameter)
        .then((response) => {
            result = response;
        })
        .catch((err : AxiosError) => (result = err));
    // console.log(result);
    return result;
}