// app/api/article/update/route.ts

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { _id, path } = body;

  // 1. 실제 업데이트 로직

  revalidatePath(`/pinetree/${path}/${_id}`);

  // 2. 캐시 무효화

  return NextResponse.json({ ok: true });
}
