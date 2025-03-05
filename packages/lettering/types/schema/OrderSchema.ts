// ✅ Order 테이블

export enum OrderStatusEnum {
  pending = '주문 대기중',
  inProgress = '만드는 중',
  packed = '포장완료',
  completed = '수령완료',
  refundInProgress = '환불 진행중',
  refunded = '환불완료',
}

export type OrderStatus =
  | 'pending' // 대기중
  | 'inProgress' // 만드는 중
  | 'packed' // 포장완료
  | 'completed' // 완료
  | 'refundInProgress' // 환불 진행중
  | 'refunded'; // 환불 완료

export interface OrderSchema {
  _id: string;
  orderNumber: number;
  userId: string;
  name: string;
  phoneNumber: number;
  sellerId: string;
  productId: string;
  productDetail: string;
  productImage: string;
  status: OrderStatus;
  price: number;
  discount: number;
  totalPrice: number;
  paymentMethod: string;
  couponId: string;
  bookingDate: Date;
  storeRequest: string;
  createdAt: Date;
  updatedAt: Date;
}
