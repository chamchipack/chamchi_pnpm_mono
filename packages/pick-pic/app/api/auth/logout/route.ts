import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  cookies().set('socialId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // 즉시 만료 (쿠키 삭제)
    path: '/',
  });

  cookies().set('user_id', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // 즉시 만료 (쿠키 삭제)
    path: '/',
  });

  cookies().set('auth_Token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // 즉시 만료 (쿠키 삭제)
    path: '/',
  });

  return NextResponse.json({ message: 'OK' });
}
