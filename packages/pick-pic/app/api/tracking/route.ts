// app/api/tracking/route.ts
import { NextRequest, NextResponse } from 'next/server';

function withBaseHref(html: string) {
  // <head> 바로 뒤에 base 삽입 (이미 base가 있다면 중복 삽입 방지)
  if (/<base\s/i.test(html)) return html;
  return html.replace(
    /<head([^>]*)>/i,
    `<head$1><base href="https://info.sweettracker.co.kr/">`,
  );
}

async function forwardToSweetTracker(
  trackingNumber: string,
  parcelCompanyCode: string,
) {
  const apiKey = process.env.SWEETTRACKER_KEY;
  if (!apiKey) throw new Error('SWEETTRACKER_KEY is missing');

  const body = new URLSearchParams({
    t_key: apiKey,
    t_code: parcelCompanyCode,
    t_invoice: trackingNumber,
  });

  const up = await fetch('https://info.sweettracker.co.kr/tracking/5', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    // cache: 'no-store', // 필요시
  });

  const rawHtml = await up.text();
  const html = withBaseHref(rawHtml); // ✅ 상대경로 문제 해결

  return new NextResponse(html, {
    status: up.status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackingNumber = searchParams.get('trackingNumber') || '';
  const parcelCompanyCode = searchParams.get('parcelCompanyCode') || '';

  if (!trackingNumber || !parcelCompanyCode) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    return await forwardToSweetTracker(trackingNumber, parcelCompanyCode);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? 'Upstream error' },
      { status: 502 },
    );
  }
}
