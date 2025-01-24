import { ObjectId } from "mongodb";

declare type Provider = 'local' | 'kakao' | 'naver' | 'google'

declare type Roles = 'user' | 'admin' | 'super'

export declare type Auth = {
    _id: ObjectId,
    provider: Provider,
    social_id: string | null,
    email: string | null,
    password: string | null,
    name: string,
    profile_image: string;
    refresh_token: string | null
    refresh_expires_at: string | null
    created_at: string,
    updated_at: string,
    last_login_at: string;
    is_active: boolean;
    roles: Roles[];
    metadata?: any
}