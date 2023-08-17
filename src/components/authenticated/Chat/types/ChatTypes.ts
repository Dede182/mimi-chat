export interface ChatListDataType {
    chat_id: number;
    user_id: number;
    name: string;
    email: string;
    profile_photo: string;
    lastMessage: string;
}

export interface ChatMessageDatatType {
    id: number;
    message: string;
    is_read: number;
    sender_id: number;

}