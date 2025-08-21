import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    socialId,
    fcmToken,
    profile,
    provider,
    isWebView = false,
    isMarketingAlarm,
  } = await req.json();

  const requestBody: Record<string, any> = {
    socialId,
    provider,
    fcmToken,
    profile,
  };

  if (typeof isMarketingAlarm === 'boolean') {
    requestBody.isMarketingAlarm = isMarketingAlarm;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );

    const { data } = await response.json();

    if (data) {
      cookies().set('user_id', data?.user?._id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: isWebView ? 315360000 : 86400, // 10년 (초 단위)
        path: '/',
      });

      cookies().set('auth_token', data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: isWebView ? 315360000 : 86400, // 10년 (초 단위)
        path: '/',
      });

      cookies().set('socialId', socialId.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: isWebView ? 315360000 : 86400, // 10년 (초 단위)
        path: '/',
      });

      const result = {
        _id: data?.user?._id,
        nickname: data?.user?.nickname,
        provider: data?.user?.provider,
        phoneNumber: data?.user?.phoneNumber,
        profile_image: data?.user?.profile,
        isAlarm: data?.user?.isAlarm,
        isMarketingAlarm: data?.user?.isMarketingAlarm,
        socialId,
      };

      return NextResponse.json({ message: 'OK', data: result });
    }
  } catch (e) {
    return NextResponse.json({ message: 'failed' });
  }
}
