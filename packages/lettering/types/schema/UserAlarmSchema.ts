// ✅ 주문 관련 알림
interface UserAlarmSchema {
  _id: string;
  userId: string;
  orderId: string;
  title: string;
  content: string;
  createdAt: Date;
}
