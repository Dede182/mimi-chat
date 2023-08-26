export interface ChatListDataType {
    chat_id: number;
    user_id: number;
    name: string;
    profile_photo: string;
    last_message: string;
    is_read : number;
    seem_at : string;
    sender_id : number;
    created_at: string;
}

export interface FilePath{
    preview : string,
    hd : string,
}
export interface ChatMessageDatatType {
    id: number;
    message: string;
    sender_id: number;
    created_at : string;
    message_type : string;
    file_path : FilePath[];
}

export interface FriendType {
    id: number;
    name: string,
    email: string,
    profile_photo: string,
    isActive: boolean,
  }
  