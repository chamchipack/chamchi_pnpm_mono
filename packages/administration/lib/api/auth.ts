import { pb } from '@/lib/pocketbase/server';

export async function signInWithPocketBase(email: string, password: string) {
  const authData = await pb
    .collection('instructor')
    .authWithPassword(email, password);

  // httpOnly 쿠키로 export
  const cookie = pb.authStore.exportToCookie({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return { authData, cookie };
}
