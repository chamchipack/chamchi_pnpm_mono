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

// lib/swr/auth.ts (또는 기존 auth 관련 파일)
export async function logout() {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('로그아웃 실패');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
