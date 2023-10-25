export enum CurrentAside  {
    DEFAULT = 'default',
    GROUP = 'group',
    FAVORITES = 'favorites',
    SETTINGS = 'settings',
}

interface SingleChatInfo {
    user_id: number;
    single_chat_id: number;
    id?: number;
  }
  
 export interface SearchedUsers {
    id: number;
    name: string;
    email: string;
    has_chat: boolean;
    profile_photo: string;
    single_chat_infos: SingleChatInfo[];
  }

  
export interface FavoriteUserResponse {
    id : number;
    user_id : number;
    fav_id : number;
    chat_id : number;
    email : string;
    name : string;
    profile_photo:string;
}

export interface UnFavList
{
    id : number;
    email : string;
    name : string;
    profile_photo:string;
    single_chat_infos: SingleChatInfo[];
}

export type FavoriteUser = Pick<FavoriteUserResponse , "id" | "name" | "email" | "profile_photo" | "chat_id">;


