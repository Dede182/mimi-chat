export enum CurrentAside  {
    DEFAULT = 'default',
    CONTACTS = 'contacts',
    FAVORITES = 'favorites',
    SETTINGS = 'settings',
}

interface SingleChatInfo {
    user_id: number;
    single_chat_id: number;
    id: number;
  }
  
 export interface SearchedUsers {
    id: number;
    name: string;
    email: string;
    has_chat: boolean;
    profile_photo: string;
    single_chat_infos: SingleChatInfo[];
  }
  
