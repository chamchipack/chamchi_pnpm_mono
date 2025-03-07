// ✅ 쿠폰 정보
interface CouponSchema {
  _id: string;
  userId: string;
  point: number;
  issued: boolean;
  createdAt: Date;
  expiredAt: Date;
}
