// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

// 로그인 없이 접근 가능한 경로
const PUBLIC_PATHS = ['/signin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 퍼블릭 경로는 그냥 통과
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();

    // /signin 진입 시 기존 로그인 쿠키 초기화
    response.cookies.set('pb_auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // 즉시 만료
    });

    return response;
  }

  const pb = new PocketBase(process.env.POCKETBASE_URL);

  // 쿠키에서 인증 정보 불러오기
  pb.authStore.loadFromCookie(req.headers.get('cookie') || '');

  // 토큰이 없거나 만료된 경우 → /signin으로 리다이렉트
  if (!pb.authStore.isValid) {
    const signInUrl = new URL('/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 로그인 상태 → 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래를 제외한 모든 경로에 middleware 적용
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico, 기타 정적 리소스
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
