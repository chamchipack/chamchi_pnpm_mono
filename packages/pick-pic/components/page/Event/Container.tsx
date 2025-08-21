import { useEvent } from '@/api/server/server-api';
import CommonImage from '@/components/common/image/CommonImage';
import { DataStructureKey } from '@/types/schema/default';
import dayjs from 'dayjs';

interface Props {
  eventId: string;
}

const Container = async ({ eventId }: Props) => {
  const { data } = await useEvent<DataStructureKey.event>(eventId);

  if (!data) return null;

  const { title, description, images, startDate, endDate } = data;

  return (
    <div className="w-full">
      {/* 이미지 영역: 패딩 없이 화면 너비 채움 */}
      {images.length > 0 && (
        <div className="w-full">
          {images.map((img, idx) => (
            <CommonImage
              key={idx}
              src={img}
              alt={`event-image-${idx}`}
              width="100%"
              height="auto"
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-1">
        <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">
          이벤트 기간: {dayjs(startDate).format('YYYY.MM.DD')} ~{' '}
          {dayjs(endDate).format('YYYY.MM.DD')}
        </p>
        <div className="text-gray-800 whitespace-pre-wrap text-sm mt-4 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Container;
