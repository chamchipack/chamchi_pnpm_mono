import { ResponseStatus } from '@/types/enums/enums';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { identityVerificationId } = await req.json();

    // 포트원 본인인증 내역 단건조회 API 호출
    const verificationResponse = await fetch(
      `https://api.portone.io/identity-verifications/${encodeURIComponent(identityVerificationId)}`,
      {
        headers: {
          Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_SECRETKEY}`,
        },
      },
    );

    if (!verificationResponse.ok)
      return NextResponse.json({ status: ResponseStatus.error });

    const identityVerification = await verificationResponse.json();

    if (identityVerification.status !== 'VERIFIED')
      return NextResponse.json({ status: ResponseStatus.error });

    // API로 phoneNumber POST 요청

    return NextResponse.json({
      identityVerification,
      status: ResponseStatus.success,
    });
  } catch (error) {
    console.error('본인인증 조회 오류:', error);
    return NextResponse.json(
      { error: '본인인증 결과 조회 실패' },
      { status: 500 },
    );
  }
}
