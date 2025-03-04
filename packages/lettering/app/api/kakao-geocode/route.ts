import { NextRequest, NextResponse } from 'next/server';

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '';

if (!KAKAO_API_KEY) {
  throw new Error('카카오 API 키가 설정되지 않았습니다.');
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
  const kakaoUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodedQuery}`;

  try {
    const response = await fetch(kakaoUrl, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('카카오 API 오류 응답:', data);
      throw new Error(`카카오 API 요청 실패: ${response.status}`);
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
