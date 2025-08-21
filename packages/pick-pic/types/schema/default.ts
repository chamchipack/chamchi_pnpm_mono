import { CouponSchema } from './CouponSchema';
import { EventSchema } from './EventSchema';
import { FAQSchema } from './FAQSchema';
import { OrderSchema } from './OrderSchema';
import { ProductSchema } from './ProductSchema';
import { ReviewSchema } from './ReviewSchema';
import { SearchSchema } from './SearchSchema';
import { UserAlarmSchema } from './UserAlarmSchema';
import { UserSchema } from './UserSchema';

// ✅ Enum으로 키 정의
export enum DataStructureKey {
  order = 'order',
  seller = 'seller',
  additioanl = 'additional',
  announcement = 'announcement',
  bookmark = 'bookmark',
  coupon = 'coupon',
  FAQ = 'FAQ',
  product = 'product',
  review = 'review',
  search = 'search',
  sellerAlarm = 'sellerAlarm',
  userAlarm = 'userAlarm',
  user = 'user',
  event = 'event',
}

// 기존 interface → type 으로 변경 (제네릭 조작 가능하게)
export type StructuredDataSchemas = {
  [DataStructureKey.order]: OrderSchema;
  [DataStructureKey.seller]: SellerSchema;
  [DataStructureKey.additioanl]: AdditionalProductSchema;
  [DataStructureKey.announcement]: AnnouncementSchema;
  [DataStructureKey.bookmark]: BookmarkSchema;
  [DataStructureKey.coupon]: CouponSchema;
  [DataStructureKey.FAQ]: FAQSchema;
  [DataStructureKey.product]: ProductSchema;
  [DataStructureKey.review]: ReviewSchema;
  [DataStructureKey.search]: SearchSchema;
  [DataStructureKey.user]: UserSchema;
  [DataStructureKey.sellerAlarm]: SellerAlarmSchema;
  [DataStructureKey.userAlarm]: UserAlarmSchema;
  [DataStructureKey.event]: EventSchema;
};

export type SchemaTransform<
  K extends keyof StructuredDataSchemas,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[K] = never,
> = Op extends 'Omit'
  ? Omit<StructuredDataSchemas[K], F>
  : Op extends 'Pick'
    ? Pick<StructuredDataSchemas[K], F>
    : Op extends 'Partial'
      ? Partial<StructuredDataSchemas[K]>
      : Op extends 'Readonly'
        ? Readonly<StructuredDataSchemas[K]>
        : StructuredDataSchemas[K]; // Op = 'none' 일 때 fallback

// type ProductWithoutId = SchemaTransform<DataStructureKey.product>;
