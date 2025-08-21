'use client';

import MinimumReservationNotice from '@/components/common/info/store/MinimumReservationNotice';
import OperatingDaysBadge from '@/components/common/info/store/OperatingDaysBadge';
import SellerPreview from '@/components/page/Store/list/SellerPreview';
import EmptyDataOverlay from 'package/src/Overlay/empty/EmptyDataOverlay';
import React from 'react';
import { LocationSellerPick } from '../Container';

interface Props {
  items: Pick<SellerSchema, LocationSellerPick>[];
  selectedMarker: Pick<SellerSchema, LocationSellerPick> | null;
  setSelectedMarker: (item: Pick<SellerSchema, LocationSellerPick>) => void;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  setCenter: (data: Center) => void;
}

const SellerDrawerList = ({
  items,
  selectedMarker,
  setSelectedMarker,
  itemRefs,
  setCenter,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {items.length > 0 ? (
        items.map((item, i) => (
          <div
            key={item._id}
            ref={(el) => {
              itemRefs.current[item._id] = el;
            }}
            className={`py-6 cursor-pointer ${
              item._id === selectedMarker?._id ? 'bg-gray-50' : 'bg-transparent'
            }`}
            onClick={() => {
              setSelectedMarker(item);
              setCenter({ lat: item.lat, lng: item.lng });
            }}
          >
            <SellerPreview {...item} index={i} isImageClickable={false} />

            <div className="px-4">
              <OperatingDaysBadge operatingDays={item.operatingDays} />
              <MinimumReservationNotice
                minimumReservationDate={item.minimumReservationDate}
              />
              <hr className="mt-4 border-gray-200" />
            </div>
          </div>
        ))
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="검색 결과가 없어요!" />
        </div>
      )}
    </div>
  );
};

export default React.memo(SellerDrawerList);
