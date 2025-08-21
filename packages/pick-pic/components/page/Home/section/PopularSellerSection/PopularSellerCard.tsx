'use client';

import CommonImage from '@/components/common/image/CommonImage';

interface Props {
  alias: string;
  imageSrc: string;
  marketName: string;
  rating: number;
  index: number;
  location: string;
  onClick: () => void;
  onPrefetch: () => void;
}

export default function PopularSellerCard({
  alias,
  imageSrc,
  marketName,
  rating,
  index,
  location,
  onClick,
  onPrefetch,
}: Props) {
  return (
    <div
      className={`flex flex-col items-start ${index === 0 ? 'ml-2' : 'ml-0'} mr-2`}
    >
      <div
        data-testid={`home-popular-seller-${index}`}
        className="w-[180px] h-[180px] relative overflow-hidden rounded-md bg-gray-200 cursor-pointer"
        onClick={onClick}
        onMouseEnter={onPrefetch}
        onTouchStart={onPrefetch}
        onFocus={onPrefetch}
      >
        <CommonImage
          src={imageSrc || ''}
          alt={marketName}
          width="100%"
          height="100%"
        />

        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-b from-transparent to-black opacity-60" />

        {rating && (
          <div className="absolute bottom-2 right-2 flex items-center bg-white rounded-full px-2 py-0.5 text-orange-400 text-[12px] font-medium z-10">
            <svg
              className="w-3 h-3 mr-1 fill-orange-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="w-full mt-1 flex items-start justify-between">
        <div className="flex flex-col min-w-0 max-w-[150px]">
          <p className="text-xs text-gray-900 truncate">{marketName}</p>
          <p className="text-xs text-gray-400 truncate">{location}</p>
        </div>
      </div>
    </div>
  );
}
