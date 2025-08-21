// // ✅ 주문 관련 알림

// export enum UserAlarmEnums {
//   ORDER = 'ORDER', // 주문
//   ORDER_IN_PROGRESS = 'ORDER_IN_PROGRESS', // 주문 진행중
//   ORDER_PACKED = 'ORDER_PACKED', // 주문 포장
//   ORDER_COMPLETED = 'ORDER_COMPLETED', // 모든 과정 완료
//   ORDER_REFUND_COMPLETED = 'ORDER_REFUND_COMPLETED', // 주문 환불 완료
//   ORDER_CANCELLED = 'ORDER_CANCELLED', // 주문 취소
//   REVIEW_COMPLETED = 'REVIEW_COMPLETED', // 리뷰 완료
//   REVIEW_DELETED = 'REVIEW_DELETED', // 리뷰 삭제
// }

// type SellerInfo = {
//   sellerId: {
//     marketName: string;
//     _id: string;
//     alias: string;
//     isDeleted: boolean;
//   };
//   _id: string;
// };

// export type UserAlarmType =
//   | 'ORDER'
//   | 'ORDER_CANCELLED'
//   | 'ORDER_COMPLETED'
//   | 'ORDER_IN_PROGRESS'
//   | 'ORDER_PACKED'
//   | 'ORDER_REFUND_COMPLETED'
//   | 'REVIEW_COMPLETED'
//   | 'REVIEW_DELETED';

// export interface UserAlarmSchema {
//   _id: string;
//   userId: string;
//   orderId: SellerInfo;
//   title: string;
//   content: string;
//   isRead: boolean;
//   type: UserAlarmType;
//   createdAt: Date;
// }

import { z } from 'zod';

// ✅ enum 정의
export const UserAlarmEnums = z.enum([
  'ORDER',
  'ORDER_IN_PROGRESS',
  'ORDER_PACKED',
  'ORDER_COMPLETED',
  'ORDER_REFUND_COMPLETED',
  'ORDER_CANCELLED',
  'REVIEW_COMPLETED',
  'REVIEW_DELETED',
]);

// ✅ SellerInfo 타입
export const SellerInfoSchema = z.object({
  sellerId: z.object({
    marketName: z.string(),
    _id: z.string(),
    alias: z.string(),
    isDeleted: z.boolean(),
  }),
  _id: z.string(),
});

// ✅ 전체 스키마
export const UserAlarmSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  orderId: SellerInfoSchema,
  title: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  type: UserAlarmEnums,
  createdAt: z.coerce.date(), //
  updatedAt: z.coerce.date(), //
});

// ✅ 타입 추출
export type UserAlarmType = z.infer<typeof UserAlarmEnums>;
export type UserAlarmSchema = z.infer<typeof UserAlarmSchema>;
