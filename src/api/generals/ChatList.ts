import { AxiosError } from 'axios';
import { modifiedAxiosResponse } from './../auth/AuthRequest';
import { ApiRequest } from '@/api/ApiRequest';


export const getChatData = async (url: string, token: string) => {
    try {
        const obj = {
            method: "get",
            url: url,
            token  :token
        }
        const response = await ApiRequest(obj) as modifiedAxiosResponse;
        if(response instanceof AxiosError)
        {
            return response.response
        }
        
        return response;

    }
    catch (e) {
        if (e instanceof Error) {
            //return some thing
            return e;
        }
    }
}