import { StructuredDataSchemas } from '@/types/schema/default';

export const orderlist: StructuredDataSchemas<string>['order'][] = [
  {
    _id: 'order1',
    orderNumber: 100001,
    userId: 'user1',
    name: 'nickname1',
    phoneNumber: 1012345678,
    sellerId: 'seller1',
    productId: 'product1',
    productDetail: 'Product Detail 1',
    productImage: 'https://placehold.co/600x400',
    status: 'pending', // 대기중
    price: 30000,
    discount: 2000,
    totalPrice: 28000,
    paymentMethod: 'card',
    couponId: 'coupon1',
    bookingDate: new Date(),
    storeRequest: 'Request 1',
    createdAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 10); // 10일 전
      return date;
    })(),
    updatedAt: new Date(),
  },
  {
    _id: 'order2',
    orderNumber: 100002,
    userId: 'user2',
    name: 'nickname2',
    phoneNumber: 1023456789,
    sellerId: 'seller2',
    productId: 'product2',
    productDetail: 'Product Detail 2',
    productImage: 'https://placehold.co/600x400',
    status: 'inProgress', // 만드는 중
    price: 45000,
    discount: 5000,
    totalPrice: 40000,
    paymentMethod: 'bankTransfer',
    couponId: 'coupon2',
    bookingDate: new Date(),
    storeRequest: 'Request 2',
    createdAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 3); // 10일 전
      return date;
    })(),
    updatedAt: new Date(),
  },
  {
    _id: 'order3',
    orderNumber: 100003,
    userId: 'user3',
    name: 'nickname3',
    phoneNumber: 1034567890,
    sellerId: 'seller3',
    productId: 'product3',
    productDetail: 'Product Detail 3',
    productImage: 'https://placehold.co/600x400',
    status: 'packed', // 포장완료
    price: 55000,
    discount: 0,
    totalPrice: 55000,
    paymentMethod: 'cash',
    couponId: '',
    bookingDate: new Date(),
    storeRequest: 'Request 3',
    createdAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 5); // 10일 전
      return date;
    })(),
    updatedAt: new Date(),
  },
  {
    _id: 'order4',
    orderNumber: 100004,
    userId: 'user4',
    name: 'nickname4',
    phoneNumber: 1045678901,
    sellerId: 'seller4',
    productId: 'product4',
    productDetail: 'Product Detail 4',
    productImage: 'https://placehold.co/600x400',
    status: 'completed', // 완료
    price: 60000,
    discount: 10000,
    totalPrice: 50000,
    paymentMethod: 'card',
    couponId: 'coupon4',
    bookingDate: new Date(),
    storeRequest: 'Request 4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'order5',
    orderNumber: 100005,
    userId: 'user5',
    name: 'nickname5',
    phoneNumber: 1056789012,
    sellerId: 'seller5',
    productId: 'product5',
    productDetail: 'Product Detail 5',
    productImage: 'https://placehold.co/600x400',
    status: 'refundInProgress', // 환불 진행중
    price: 70000,
    discount: 5000,
    totalPrice: 65000,
    paymentMethod: 'paypal',
    couponId: 'coupon5',
    bookingDate: new Date(),
    storeRequest: 'Request 5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'order6',
    orderNumber: 100006,
    userId: 'user6',
    name: 'nickname6',
    phoneNumber: 1067890123,
    sellerId: 'seller6',
    productId: 'product6',
    productDetail: 'Product Detail 6',
    productImage: 'https://placehold.co/600x400',
    status: 'refunded', // 환불 완료
    price: 80000,
    discount: 15000,
    totalPrice: 65000,
    paymentMethod: 'credit',
    couponId: 'coupon6',
    bookingDate: new Date(),
    storeRequest: 'Request 6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
