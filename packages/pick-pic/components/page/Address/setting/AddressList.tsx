'use client';

import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import { CheckCircle, MapPin } from 'lucide-react';
import React from 'react';

type AddressListType = {
  address: string;
  longitude: string;
  latitude: string;
};

interface AddressListProps {
  addressList: AddressListType[];
  selectedAddress: string | null;
  setSelectedAddress: (id: string) => void;
  onSelectAddress: (item: AddressListType) => void;
  loading: boolean;
}

const AddressList = ({
  addressList = [],
  selectedAddress,
  setSelectedAddress,
  onSelectAddress,
  loading = false,
}: AddressListProps) => {
  if (!addressList.length)
    return <EmptyDataOverlay title="현재 주소가 지정되어 있지 않아요" />;

  return (
    <div className="space-y-2 mt-2">
      {addressList.map((item) => (
        <button
          key={item.address}
          onClick={() => {
            if (loading) return;
            if (selectedAddress !== item.address) onSelectAddress(item);
          }}
          className={`flex items-center w-full p-3 rounded-lg border ${
            selectedAddress === item.address
              ? 'bg-gray-100 border-main'
              : 'bg-white border-gray-200'
          } hover:bg-gray-50 transition-colors`}
        >
          <MapPin size={20} className="text-gray-600 mr-3 shrink-0" />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-black truncate">
              {item.address}
            </p>
            {selectedAddress === item.address && (
              <p className="text-xs text-main">현재 내 위치</p>
            )}
          </div>
          {selectedAddress === item.address && (
            <CheckCircle size={20} className="text-main ml-2 shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
};

export default React.memo(AddressList);
