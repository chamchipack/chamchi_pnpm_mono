'use client';

import { Package, Store, Truck } from 'lucide-react';
import React, { useState } from 'react';
import SellerInfoTabSection from './SellerInfoTabSection';
import SellerParcelTabSection from './SellerParcelTabSection';

export default function TabContainer({
  sellerPictures,
  sellerData,
}: {
  sellerPictures: React.ReactNode;
  sellerData: SellerSchema;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const { isParcelAvailable = false } = sellerData || {};

  const tabs = [
    { label: '상품 정보', icon: <Package size={16} />, value: 'product' },
    { label: '상점 정보', icon: <Store size={16} />, value: 'seller' },
    ...(isParcelAvailable
      ? [{ label: '택배 정보', icon: <Truck size={16} />, value: 'parcel' }]
      : []),
  ];

  return (
    <div className="w-full mt-6">
      {/* 탭 버튼 */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setTabIndex(index)}
            className={`flex-1 h-12 px-4 py-2 flex items-center justify-center gap-1 text-sm transition border-b-2 ${
              tabIndex === index
                ? 'text-black font-bold border-black'
                : 'text-gray-400 font-normal border-transparent'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="mt-6">
        {tabIndex === 0 && sellerPictures}
        {tabIndex === 1 && (
          <SellerInfoTabSection key="seller-info" sellerData={sellerData} />
        )}
        {tabIndex === 2 && (
          <SellerParcelTabSection key="seller-info" sellerData={sellerData} />
        )}
      </div>
    </div>
  );
}
