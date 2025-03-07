import { OrderSchema } from './OrderSchema';

// ✅ Enum으로 키 정의
export enum DataStructureKey {
  order = 'order',
  seller = 'seller',
  additioanl = 'additional',
  announce = 'announce',
  bookmark = 'bookmark',
  coupon = 'coupon',
  FAQ = 'FAQ',
  product = 'product',
  review = 'review',
  search = 'search',
  sellerAlarm = 'sellerAlarm',
  userAlarm = 'userAlarm',
  user = 'user',
}

export interface StructuredDataSchemas {
  [DataStructureKey.order]: OrderSchema;
  [DataStructureKey.seller]: SellerSchema;
  [DataStructureKey.additioanl]: AdditionalProductSchema;
  [DataStructureKey.announce]: AnnouncementSchema;
  [DataStructureKey.bookmark]: BookmarkSchema;
  [DataStructureKey.coupon]: CouponSchema;
  [DataStructureKey.FAQ]: FAQSchema;
  [DataStructureKey.product]: ProductSchema;
  [DataStructureKey.review]: ReviewSchema;
  [DataStructureKey.search]: SearchSchema;
  [DataStructureKey.user]: UserSchema;
  [DataStructureKey.sellerAlarm]: SellerAlarmSchema;
  [DataStructureKey.userAlarm]: UserAlarmSchema;
}

// const handle = <T extends DataStructureKey>(): StructuredDataSchemas<T>[T] => {
//   const rs: StructuredDataSchemas<T>[T] = {} as StructuredDataSchemas<T>[T]; // ✅ 빈 객체로 초기화
//   return rs;
// };

// const orderResult = handle<DataStructureKey.order>();
// console.log(orderResult.orderNumber); // ✅ 정상 출력

// const sellerResult = handle<DataStructureKey.seller>();
// console.log(sellerResult.marketName); // ✅ 정상 출력
