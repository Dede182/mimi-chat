import { ApiRequest } from '@/api/ApiRequest';


export interface CreateGroupChatData {
    group_name : string,
    user_id : number[]
}

export const createGroupChat = async (url: string,data : CreateGroupChatData) => {
    return await ApiRequest({
        method: 'post',
        url: url,
        params : data
        })
}

export type CreatedGropChat  = ReturnType<typeof createGroupChat>