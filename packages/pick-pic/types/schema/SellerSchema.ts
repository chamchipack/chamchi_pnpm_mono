interface SellerSchema {
  _id: string;
  alias: string;
  marketName: string;
  images: string[];
  lat: number;
  lng: number;
  location: string;
  locationDetail: string;
  sellerName: string;
  id: string;
  pw: string;
  businessNumber: number;
  operatingDays: string[];
  rating?: number;
  reviewCount: number;
  mutualName: string;
  startTime: number;
  endTime: number;
  breakStartTime: number;
  breakEndTime: number;
  saturdayStartTime: number; // 토요일 영업 시작시간
  saturdayEndTime: number; // 토요일 영업 종료시간
  sundayStartTime: number; // 일요일 영업 시작시간
  sundayEndTime: number; // 일요일 영업 종료시간
  holidayStartTime: number; // 공휴일 영업 시작시간
  holidayEndTime: number;
  originalInfo: string;
  introduction: string;
  openedAt: Date;
  closedAt: Date;
  minimumReservationDate: number;
  isDeleted: boolean;
  minimumParcelReservationDate: number; // 최소 택배 예약일
  parcelReservationGuide: string; // 택배 예약 안내 문구
  parcelFee: number; // 택배 요금
  isParcelAvailable: boolean; // 택배 가능 여부
  isParcelAvailableOnSaturday: boolean; // 토요일 택배 가능 여부
  isParcelAvailableOnSunday: boolean; // 일요일 택배 가능 여부
  isParcelAvailableOnHoliday: boolean; // 공휴일 택배 가능 여부
  createdAt: Date;
  updatedAt: Date;
}
