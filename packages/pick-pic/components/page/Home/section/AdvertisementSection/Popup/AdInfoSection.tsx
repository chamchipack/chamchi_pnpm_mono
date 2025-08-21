'use client';

import { EventSchema } from '@/types/schema/EventSchema';
import { useRouter } from 'next/navigation';

interface Props {
  item: EventSchema;
}

export default function AdInfoSection({ item }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event?eventId=${item._id}`);
  };

  return (
    <div className="px-4 py-3 space-y-1">
      <h2
        className="text-base font-semibold text-gray-900 cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => router.prefetch(`/event?eventId=${item._id}`)}
      >
        {item.title}
      </h2>
      <p className="text-sm text-gray-700 break-words line-clamp-2">
        {item.description}
      </p>
      <p className="text-xs text-gray-500">
        {item.startDate.toString()?.slice(0, 10)} ~{' '}
        {item.endDate.toString()?.slice(0, 10)}
      </p>
    </div>
  );
}
