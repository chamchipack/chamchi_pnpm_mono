'use client';

import { useSmartNavigation } from '@/config/navigation';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';

interface Props {
  type: string;
  item: StructuredDataSchemas[DataStructureKey.announcement];
}

export default function AnnouncementComponent({ type, item }: Props) {
  const smartNavigate = useSmartNavigation();

  const handleRouter = (_id: string) => {
    const path = 'policy/policy-detail';
    const params = { type, _id };
    smartNavigate({ path, status: 'forward', params });
  };

  return (
    <div
      key={item._id}
      onClick={() => handleRouter(item._id)}
      className="flex items-center justify-between bg-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-300 transition-colors"
    >
      {/* 왼쪽: 제목 + 날짜 */}
      <div>
        <p className="text-sm font-semibold text-black">{item.title ?? ''}</p>
        <p className="text-xs text-gray-600 mt-1">
          {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>

      {/* 오른쪽: 아이콘 */}
      <ChevronRight className="w-4 h-4 text-gray-500" />
    </div>
  );
}
