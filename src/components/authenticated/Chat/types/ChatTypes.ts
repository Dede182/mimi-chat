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

export interface ChatMessageDatatType {
    id: number;
    message: string;
    is_read: number;
    sender_id: number;

}