export interface AuthUser {
    id: number;
    email: string;
    name: string;
    profile_photo : string,
    phone?: string;
    created_at?: string
}