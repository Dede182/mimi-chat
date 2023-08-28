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
        const response = await ApiRequest(obj)     
        return response;

    }
    catch (error) {
      // Check if the error is an instance of AxiosError
      if (error instanceof AxiosError) {
          // Return the error response if available
          return error.response;
      } else {
          // Handle non-Axios errors here if needed
          console.error('Non-Axios error:', error);
          throw error; // Re-throw the error for further handling
      }
  }
}

export const sendEventMessage =async(message: string,user_id: number,chat_id: string,chatPrefix :number,type : string = "message",files? : File[])  =>  {
    return await ApiRequest({
      method: 'post',
      url: '/user/chats/store/messages',
      params : {
        message : message,
        sender_id : user_id,
        chat_id : chat_id,
        prefix_id : chatPrefix,
        message_type : type,
        files : files,
      }
    }) as modifiedAxiosResponse
   }

export const downloadChatFile =async(fileName: string,chatId : string | number)  =>  {
    return await ApiRequest({
      method: 'post',
      url: '/user/chats/download/file',
      params : {
        fileName : fileName,
        chatId : chatId,
      },
      responseType : 'blob'
    }) as modifiedAxiosResponse
    }

    export const sendEventFileMessage = async (body: FormData) => {
      try {
          const response = await ApiRequest({
              method: 'post',
              url: '/user/chats/store/messages',
              params: body
          });
  
          return response;
      } catch (error) {
          // Check if the error is an instance of AxiosError
          if (error instanceof AxiosError) {
              // Return the error response if available
              return error.response;
          } else {
              // Handle non-Axios errors here if needed
              console.error('Non-Axios error:', error);
              throw error; // Re-throw the error for further handling
          }
      }
  };


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
