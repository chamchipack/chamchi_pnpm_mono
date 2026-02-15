// app/api/classes/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const classIdParams = searchParams.get('classId');
    const sessionIdParams = searchParams.get('sessionId');

    let classList: { id: string; name: string }[] = [];
    let sessionList: { id: string; name: string }[] = [];

    /**
     * classId 조회
     */
    if (classIdParams) {
      const classIds = classIdParams.split(',').filter(Boolean);

      if (classIds.length > 0) {
        const classFilter = classIds.map((id) => `id = "${id}"`).join(' || ');

        classList = await pb.collection('class').getFullList({
          filter: classFilter,
          fields: 'id,name',
        });
      }
    }

    /**
     * sessionId 조회
     */
    if (sessionIdParams) {
      const sessionIds = sessionIdParams.split(',').filter(Boolean);

      if (sessionIds.length > 0) {
        const sessionFilter = sessionIds
          .map((id) => `id = "${id}"`)
          .join(' || ');

        sessionList = await pb.collection('session').getFullList({
          filter: sessionFilter,
          fields: 'id,name,lessonTimes,regularDays,regularTimes',
        });
      }
    }

    return NextResponse.json({
      classId: classList ?? [],
      sessionId: sessionList ?? [],
    });
  } catch (error) {
    console.error('[GET /api/classes]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
