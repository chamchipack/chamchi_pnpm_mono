'use client';

import { Dialog } from '@mui/material';
import { Map } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const KakaoMapForInformation = dynamic(
  () => import('@/components/page/Location/map/KakaoMapForInformation'),
  {
    ssr: false,
    loading: () => null,
  },
);

type Props = {
  seller: SellerSchema;
};

const OrderSellerInformation = ({ seller }: Props) => {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <p className="text-lg font-bold">{seller.marketName}</p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {seller?.location} {seller?.locationDetail}
          </p>
          {seller?.lat && seller?.lng && (
            <button
              className="p-1 text-gray-500 hover:text-gray-700"
              onClick={() => setMapOpen(true)}
            >
              <Map size={18} />
            </button>
          )}
        </div>
      </div>

      <Dialog open={mapOpen} onClose={() => setMapOpen(false)}>
        <div className="w-95 h-[320px]">
          <KakaoMapForInformation
            _id={seller._id}
            lat={seller.lat}
            lng={seller.lng}
          />
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(OrderSellerInformation);
