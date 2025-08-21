// ✅ 쿠폰 정보
export interface CouponSchema {
  _id: string;
  userId: string;
  sellerId: string | null;
  name: string;
  point: number;
  isUsed: boolean;
  minOrderPrice: number;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
