import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code } = await req.json();
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL || '';

  // ✅ 액세스 토큰 요청
  const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
      client_secret: KAKAO_CLIENT_SECRET,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return NextResponse.json({ error: '토큰 요청 실패' }, { status: 400 });
  }

  // ✅ 사용자 정보 요청
  const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const userData = await userRes.json();

  // cookies().set('socialId', userData?.id.toString(), {
  //   httpOnly: true,
  //   secure: false,
  //   maxAge: 3600, // 10년 (초 단위)
  //   path: '/',
  // });

  return NextResponse.json({ user: userData });
}
