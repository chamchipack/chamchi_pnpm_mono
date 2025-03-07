// ✅ 판매자 알림

interface SellerAlarmSchema {
  _id: string;
  sellerId: string;
  orderId: string;
  title: string;
  content: string;
  createdAt: Date;
}
