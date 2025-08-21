'use client';

import MinimumReservationNotice from '@/components/common/info/store/MinimumReservationNotice';
import OperatingDaysBadge from '@/components/common/info/store/OperatingDaysBadge';
import SellerPreview from '@/components/page/Store/list/SellerPreview';
import { globalMaxWidth } from '@/config/utils/global';
import React from 'react';
import { LocationSellerPick } from '../Container';

interface Props {
  selectedMarker: Pick<SellerSchema, LocationSellerPick>;
}

const SelectionPreview = ({ selectedMarker }: Props) => {
  return (
    <div
      className="z-30 fixed left-1/2 bottom-0 w-full h-[320px] bg-white z-10 overflow-hidden transition-all rounded-t-[20px]"
      style={{ transform: 'translateX(-50%)', maxWidth: globalMaxWidth }}
    >
      <div className="mb-4 pt-4">
        <SellerPreview {...selectedMarker} isImageClickable={false} index={0} />
        <div className="px-4">
          <OperatingDaysBadge operatingDays={selectedMarker.operatingDays} />
          <MinimumReservationNotice
            minimumReservationDate={selectedMarker.minimumReservationDate}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SelectionPreview);
