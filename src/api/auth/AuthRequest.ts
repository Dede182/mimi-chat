import { AxiosError, AxiosResponse } from 'axios';
import { ApiRequest } from '../ApiRequest';
import { EditForm } from '@/components/authenticated/base/Aside/setting/Account/ProfileInfoEdit';

const postObj = (url: string, body: object) => {
    return {
        method: "post",
        url: url,
        params: body
    }
};

export interface modifiedAxiosResponse extends AxiosResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postLogin = async (url: string, body: any) => {
    try {
        const obj = postObj(url, body);
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

export const getProfile = async (url: string, token: string) => {
    console.log("get profile api was called")
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

export const updateProfilePicture = async (body : FormData) => {
        return await ApiRequest({
            method: 'post',
            url: '/user/profile/photo/update',
            params : body
        }) 
}

export const updateProfile = async (body : EditForm) => {
    return await ApiRequest({
        method: 'put',
        url: '/user/profile/update',
        params : body
    }) 
}