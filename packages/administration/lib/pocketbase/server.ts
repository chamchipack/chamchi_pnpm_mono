// src/lib/pocketbase/server.ts
import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '@/lib/api/base';

export const pb = new PocketBase(POCKETBASE_URL);

// 필요하면 여기서 관리자 인증도 가능
// await pb.admins.authWithPassword(...)
