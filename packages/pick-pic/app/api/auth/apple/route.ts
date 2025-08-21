import { NextRequest, NextResponse } from 'next/server';

function decodeJwt(token: string): any {
  const payload = token.split('.')[1];
  const decoded = Buffer.from(payload, 'base64url').toString('utf-8');
  return JSON.parse(decoded);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const id_token = formData.get('id_token')?.toString() ?? '';
  const state = formData.get('state')?.toString();

  // state가 없으면 에러 페이지로 리디렉션
  if (!state) {
    return NextResponse.redirect(new URL('/error', req.url), 303);
  }

  const decoded = decodeJwt(id_token);

  const query = new URLSearchParams({
    email: decoded?.sub || '',
    state,
  });

  return NextResponse.redirect(new URL(`/auth/apple?${query}`, req.url), 303);
}
