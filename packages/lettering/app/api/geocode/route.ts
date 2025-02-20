import { NextRequest, NextResponse } from 'next/server';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '';
const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || '';

if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
  throw new Error('네이버 API 키가 설정되지 않았습니다.');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query'); // 변환할 주소

  if (!query) {
    return NextResponse.json(
      { error: '주소(query)를 제공하세요.' },
      { status: 400 },
    );
  }

  // 📌 URL 인코딩 적용 (한글 주소 포함 가능)
  const encodedQuery = encodeURIComponent(query);
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedQuery}`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
        Accept: 'application/json',
      },
    });

    const data = await res.json(); // JSON 응답 파싱

    if (!res.ok) {
      console.error('네이버 API 오류 응답:', data);
      throw new Error(`네이버 API 요청 실패: ${res.status}`);
    }

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error: any) {
    console.error('서버 오류:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
