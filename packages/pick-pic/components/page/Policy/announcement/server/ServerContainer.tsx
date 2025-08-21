'use client';

import { useAnnouncementById } from '@/api/server/announcement';
import { DataStructureKey } from '@/types/schema/default';
import dayjs from 'dayjs';

interface Props {
  type: string;
  _id: string;
}

export default async function ServerContainer({ type, _id }: Props) {
  if (!_id)
    return <p className="text-sm text-gray-500">데이터가 존재하지 않습니다!</p>;

  const { data, result } =
    await useAnnouncementById<DataStructureKey.announcement>(_id);

  if (result !== 'OK' || !data)
    return <p className="text-sm text-gray-500">데이터가 존재하지 않습니다!</p>;

  return (
    <div className="mt-4 px-4">
      <h1 className="text-xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {dayjs(data.createdAt).format('YYYY-MM-DD')}
      </p>
      <p className="text-base mt-4 whitespace-pre-line leading-7">
        {data.description}
      </p>
    </div>
  );
}
