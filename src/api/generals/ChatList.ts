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

export const sendEventMessage =async(message: string,user_id: number,chat_id: string,chatPrefix :number)  =>  {

    return await ApiRequest({
      method: 'post',
      url: '/user/chats/store/messages',
      params : {
        message : message,
        sender_id : user_id,
        chat_id : chat_id,
        prefix_id : chatPrefix
      }
    }).catch((err: any)=>{
      console.log(err)
    })
  
   }

   export const updateLastMessage =async(chat_id: string)  =>  {

    return await ApiRequest({
      method: 'put',
      url: '/user/chats/update/lastmessage',
      params : {
        chat_id : chat_id,
      }
    }).catch((err: any)=>{
      console.log(err)
    })
  
   }