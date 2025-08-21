import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { userId, phoneNumber } = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/phone/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      },
    );

    if (!res.ok) {
      throw new Error('전화번호 업데이트 실패');
    }

    const result = await res.json();
    return NextResponse.json({ message: 'OK', data: result });
  } catch (error) {
    console.error('전화번호 업데이트 에러:', error);
    return NextResponse.json(
      { message: 'failed', error: (error as Error).message },
      { status: 500 },
    );
  }
}
