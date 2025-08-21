'use client';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerParcelTabSection({ sellerData }: Props) {
  const {
    isParcelAvailable,
    isParcelAvailableOnSaturday,
    isParcelAvailableOnSunday,
    isParcelAvailableOnHoliday,
    parcelFee,
    parcelReservationGuide,
    minimumParcelReservationDate,
  } = sellerData;

  return (
    <div className="w-full px-4">
      <h2 className="text-base font-semibold mb-4">택배 정보</h2>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">택배 가능 여부</span>
          <span>{isParcelAvailable ? '가능' : '불가'}</span>
        </div>

        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">택배 요금</span>
          <span>{parcelFee?.toLocaleString() || 0}원</span>
        </div>

        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">최소 예약일</span>
          <span>{minimumParcelReservationDate}일 전</span>
        </div>

        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">토요일 가능</span>
          <span>{isParcelAvailableOnSaturday ? '가능' : '불가'}</span>
        </div>

        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">일요일 가능</span>
          <span>{isParcelAvailableOnSunday ? '가능' : '불가'}</span>
        </div>

        <div className="flex items-center">
          <span className="min-w-[120px] text-gray-500">공휴일 가능</span>
          <span>{isParcelAvailableOnHoliday ? '가능' : '불가'}</span>
        </div>
      </div>

      <div
        className="text-sm mb-6 mt-10 text-gray-600 mt-6 whitespace-pre-line break-keep"
        dangerouslySetInnerHTML={{ __html: parcelReservationGuide }}
      />
    </div>
  );
}
