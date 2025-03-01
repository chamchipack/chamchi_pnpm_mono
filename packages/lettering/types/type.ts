enum Provider {
  Kakao = 'kakao',
  Naver = 'naver',
  Google = 'google',
}

// ✅ User 테이블
interface User {
  _id: string;
  socialId: string;
  provider: Provider;
  fcmToken: string;
  profile: string;
  nickname: string;
  point: number;
  isAlarm: boolean;
  isMarketingAlarm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Seller 테이블
interface Seller {
  _id: string;
  marketName: string;
  images: string[];
  lat: number;
  lng: number;
  location: string; // 아마 주소
  sellerName: string;
  id: string;
  pw: string;
  businessNumber: number; // 사업자 번호?
  mutualName: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  originalInfo: string; // ???
  introduction: string; // 소개글?
  openedAt: Date;
  closedAt: Date;
  mininumReservationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Order 테이블
type OrderStatus =
  | 'pending' // 대기중
  | 'inProgress' // 만드는 중
  | 'packed' // 포장완료
  | 'completed' // 완료
  | 'refundInProgress' // 환불 진행중
  | 'refunded'; // 환불 완료

interface Order {
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

// ✅ Product 테이블
interface Product {
  _id: string;
  sellerId: string;
  image: string;
  flavor: { name: string; text: string }[];
  size: { name: string; text: string; price: number }[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ AdditionalProduct 테이블
interface AdditionalProduct {
  _id: string;
  sellerId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Coupon 테이블
interface Coupon {
  _id: string;
  userId: string;
  sellerId: string;
  point: number;
  isUsed: boolean;
  createdAt: Date;
  expiredAt: Date;
}

// ✅ Review 테이블
interface Review {
  _id: string;
  orderId: string;
  userId: string;
  sellerId: string;
  star: number;
  content: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Search 테이블
interface Search {
  _id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// ✅ Bookmark 테이블
interface Bookmark {
  _id: string;
  userId: string;
  sellerId: string;
}

// ✅ UserAlarm 테이블
interface UserAlarm {
  _id: string;
  userId: string;
  orderId: string;
  title: string;
  content: string;
  createdAt: Date;
}

// ✅ SellerAlarm 테이블
interface SellerAlarm {
  _id: string;
  sellerId: string;
  orderId: string;
  title: string;
  content: string;
  createdAt: Date;
}
