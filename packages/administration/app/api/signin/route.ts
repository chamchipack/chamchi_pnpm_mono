// lib/pocketbase/auth.ts
import { signInWithPocketBase } from '@/lib/api/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('????????????????????????????');
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 },
      );
    }

    const { authData, cookie } = await signInWithPocketBase(username, password);

    const response = NextResponse.json({
      message: '로그인 성공',
      user: authData.record,
    });

    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }
}
