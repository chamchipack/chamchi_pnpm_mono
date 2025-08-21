import { ProductSchema } from './ProductSchema';
import { ReviewSchema } from './ReviewSchema';

export enum OrderStatusEnum {
  pending = '주문 대기중',
  in_progress = '만드는 중',
  packed = '포장완료',
  completed = '수령완료',
  review_completed = '리뷰 작성완료',
  refund_in_progress = '환불 진행중',
  refund_completed = '환불완료',
  cancelled = '취소',
  parcel_in_progress = '택배 배송진행',
  parcel_completed = '택배 배송완료',
  parcel_cancelled = '택배 배송취소',
}

export type OrderStatus =
  | 'pending' // 대기중
  | 'in_progress' // 만드는 중
  | 'packed' // 포장완료
  | 'completed' // 완료
  | 'refund_in_progress' // 환불 진행중
  | 'refund_completed' // 환불 완료
  | 'cancelled' // 취소
  | 'review_completed'
  | 'parcel_in_progress'
  | 'parcel_completed'
  | 'parcel_cancelled';

export enum OrderEnum {
  pending = 'pending',
  in_progress = 'in_progress',
  packed = 'packed',
  completed = 'completed',
  review_completed = 'review_completed',
  refund_in_progress = 'refund_in_progress',
  refund_completed = 'refund_completed',
  cancelled = 'cancelled',
  parcel_in_progress = 'parcel_in_progress', // 택배 배송 진행
  parcel_completed = 'parcel_completed', // 택배 배송 완료
  parcel_cancelled = 'parcel_cancelled', // 택배 배송 취소
}

export interface OrderSchema {
  _id: string;
  orderNumber: number;
  userId: string;
  name: string;
  phoneNumber: string;
  sellerId: SellerSchema;
  reviewId: ReviewSchema | null;
  options: any;
  productId: ProductSchema;
  productImage: string[];
  status: OrderStatus;
  price: number;
  discount: number;
  totalPrice: number;
  paymentMethod: string;
  couponId: string;
  paymentId: string;
  bookingDate: Date;
  isConfirmed: boolean;
  storeRequest: string;
  additionalProducts: string;
  parcelFee: number;
  address: string;
  addressDetail: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
  parcelCompany?: string;
  parcelCompanyCode?: string;
}
