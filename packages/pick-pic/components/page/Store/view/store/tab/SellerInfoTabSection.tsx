'use client';

import KakaoMapForInformation from '@/components/page/Location/map/KakaoMapForInformation';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerInfoTabSection({ sellerData }: Props) {
  return (
    <div className="w-full">
      {/* 위치 정보 */}
      <div className="px-4 mb-4">
        <h2 className="text-base font-semibold">위치 정보</h2>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            {sellerData.location} {sellerData.locationDetail}
          </p>

          <div className="mt-2 mb-6 rounded overflow-hidden h-[250px]">
            <KakaoMapForInformation
              _id={sellerData._id}
              lat={sellerData.lat}
              lng={sellerData.lng}
              zoomLevel={7}
              imageSrc={sellerData?.images?.[0] || ''}
            />
          </div>
        </div>
      </div>

      {/* 가게 정보 */}
      <div className="px-4">
        <h2 className="text-base font-semibold">가게 정보</h2>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 min-w-[70px]">상호명</span>
            <span className="text-sm">{sellerData.mutualName}</span>
          </div>

          <div className="flex items-center">
            <span className="text-xs text-gray-500 min-w-[70px]">
              사업자번호
            </span>
            <span className="text-sm">{sellerData.businessNumber}</span>
          </div>

          <div className="flex items-center">
            <span className="text-xs text-gray-500 min-w-[70px]">대표자명</span>
            <span className="text-sm">{sellerData.sellerName}</span>
          </div>

          {/* <p className="text-sm text-gray-600 mt-2 whitespace-pre-line break-keep">
            {sellerData.introduction}
          </p> */}

          <div
            className="text-sm text-gray-600 mt-2 whitespace-pre-line break-keep"
            dangerouslySetInnerHTML={{ __html: sellerData.introduction }}
          />
        </div>
      </div>

      {/* 원산지 정보 */}
      <div className="my-6 px-4">
        <h2 className="text-sm font-bold">원산지 정보</h2>
        {/* <p className="text-sm text-gray-600 mt-2 whitespace-pre-line break-keep">
          {sellerData.originalInfo}
        </p> */}
        <div
          className="text-sm text-gray-600 mt-2 whitespace-pre-line break-keep"
          dangerouslySetInnerHTML={{ __html: sellerData.originalInfo }}
        />
      </div>
    </div>
  );
}
