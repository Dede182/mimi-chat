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

export const sendEventMessage =async(message: string,user_id: number,chat_id: string,chatPrefix :number,type : string)  =>  {

    return await ApiRequest({
      method: 'post',
      url: '/user/chats/store/messages',
      params : {
        message : message,
        sender_id : user_id,
        chat_id : chat_id,
        prefix_id : chatPrefix,
        message_type : type
      }
    })
   }

   export const updateLastMessage =async(chat_id: string)  =>  {
    console.log(chat_id)
    return await ApiRequest({
      method: 'put',
      url: '/user/chats/update/lastmessage',
      params : JSON.stringify({
        chat_id : chat_id,
      })
    }) 
   }

   export const findUsers =async(url:string,search: string)  =>  {
      
      return await ApiRequest({
        method: 'post',
        url: url,
        params : {
          search : search,
        }
      }) 
    
    }
 export const addUserChat =async(userId: number)  =>  {
      
      return await ApiRequest({
        method: 'post',
        url: '/user/chats/add/users',
        params : {
          user_id : userId,
        }
      }) 
    
    }
