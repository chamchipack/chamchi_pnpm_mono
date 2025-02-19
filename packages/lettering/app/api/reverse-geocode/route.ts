import { NextRequest, NextResponse } from 'next/server';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '96xve4j2vc';
const NAVER_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ||
  'cL14ZtPP5hC7rhVnEduK0R3bvhnRyGmj1yvF7lmR';

if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
  throw new Error('네이버 API 키가 설정되지 않았습니다.');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: '위도(lon)와 경도(lat)를 제공하세요.' },
      { status: 400 },
    );
  }

  // 📌 URL 인코딩 적용
  const coords = encodeURIComponent(`${lon},${lat}`);
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&output=json&orders=legalcode,admcode,addr,roadaddr`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
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
