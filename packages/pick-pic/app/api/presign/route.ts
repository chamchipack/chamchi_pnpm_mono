import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  if (!files.length) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `pick-pic/${Date.now()}_${file.name}`;

    const command = new PutObjectCommand({
      Bucket: 'pick-pic',
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      // ACL: 'public-read', // S3 URL 접근 가능하도록
    });

    await s3.send(command);

    const url = `https://pick-pic.s3.ap-northeast-2.amazonaws.com/${filename}`;
    uploadedUrls.push(url);
  }

  return NextResponse.json(uploadedUrls);
}
