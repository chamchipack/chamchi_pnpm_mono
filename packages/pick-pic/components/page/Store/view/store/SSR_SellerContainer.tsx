import StarRatingscore from '@/components/common/rating/StarRatingScore';
import ReviewCount from '@/components/common/review/ReviewCount';
import { AlertCircle } from 'lucide-react';
import CSR_BookmarButton from './bookmark/CSR_BookmarkButton';
import CSR_Hooks from './CSR_Hooks';
import BusinessTimeBadge from './operating/BuisnessTimeBadge';
import MinimumReservationNotice from './operating/MinimumReservationNotice';
import OperatingDaysBadge from './operating/OperatingDaysBadge';

export interface SellerContainerProps extends SellerSchema {
  isBookmarked: boolean;
  sellerId: string;
  userId: string;
  additionalProducts?: AdditionalProductSchema[] | null;
}

export default function SSR_SellerContainer({
  marketName,
  location,
  isBookmarked,
  sellerId,
  userId,
  operatingDays,
  startTime,
  endTime,
  breakStartTime,
  breakEndTime,
  minimumReservationDate,
  reviewCount = 0,
  rating = 0,
  saturdayStartTime,
  saturdayEndTime,
  sundayStartTime,
  sundayEndTime,
  holidayStartTime,
  holidayEndTime,
  isDeleted,
}: SellerContainerProps & {
  reviewCount?: number;
  rating?: number;
  bookmarkCount?: number;
}) {
  // const forms = {
  //   operatingDays,
  //   startTime,
  //   endTime,
  //   breakStartTime,
  //   breakEndTime,
  //   saturdayStartTime,
  //   saturdayEndTime,
  //   sundayStartTime,
  //   sundayEndTime,
  //   holidayStartTime,
  //   holidayEndTime,
  //   minimumReservationDate,
  // };

  return (
    <div>
      {/* 상단 이름 + 북마크 */}
      <div className="flex justify-between items-center mt-2 px-4">
        <h2 className="text-xl font-bold">{marketName}</h2>
        <div className="h-[30px]">
          <CSR_BookmarButton
            userId={userId}
            sellerId={sellerId}
            isBookmarked={isBookmarked}
          />
        </div>
      </div>

      {/* 별점 + 리뷰 수 */}
      <div className="flex justify-between items-center px-4 mt-1">
        <div className="flex items-start">
          <StarRatingscore rating={rating} />
          <div className={rating ? 'ml-2' : ''}>
            <ReviewCount count={reviewCount} sellerId={sellerId} />
          </div>
        </div>
      </div>

      {isDeleted && (
        <div className="px-4 my-2">
          <div className="mt-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded flex items-center gap-1">
            <AlertCircle size={14} className="text-gray-500" />
            <span>운영이 종료된 가게입니다</span>
          </div>
        </div>
      )}

      {/* 구분선 */}
      <div className="px-4">
        <hr className="my-4 border-gray-200" />
      </div>

      {/* 운영 요일 */}
      <div className="px-4">
        <OperatingDaysBadge operatingDays={operatingDays} />
      </div>

      {/* 운영 시간들 */}
      <div className="px-4">
        <BusinessTimeBadge
          title="평일"
          startTime={startTime}
          endTime={endTime}
        />
      </div>
      <div className="px-4">
        <BusinessTimeBadge
          title="토요일"
          startTime={saturdayStartTime}
          endTime={saturdayEndTime}
        />
      </div>
      <div className="px-4">
        <BusinessTimeBadge
          title="일요일"
          startTime={sundayStartTime}
          endTime={sundayEndTime}
        />
      </div>
      <div className="px-4">
        <BusinessTimeBadge
          title="공휴일"
          startTime={holidayStartTime}
          endTime={holidayEndTime}
        />
      </div>

      <div className="px-4 mt-4">
        <MinimumReservationNotice
          minimumReservationDate={minimumReservationDate}
        />
      </div>

      <CSR_Hooks location={location} />
    </div>
  );
}
