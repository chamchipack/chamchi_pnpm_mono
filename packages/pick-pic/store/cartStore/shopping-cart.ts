import { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type OptionItem = {
  name: string;
  value: number;
  _id: string;
  type: string;
  index: number;
};

export type AddtionalItem = {
  _id: string;
  name: string;
  price: number;
};

export type AdditionalProduct = {
  [key: string]: {
    name: string;
    price: number;
    count: number;
  };
};

export type DefaultValue = {
  // 유저정보
  username: string;
  phoneNumber: string;
  // 상점정보
  sellerId: string;
  productName: string;
  storeName: string;
  storeRequest: string;
  productId: string;
  options: {
    [groupKey: string]: OptionItem;
  } | null;
  additional: AddtionalItem[] | null;
  additionalProduct: AdditionalProduct | null;
  totalPrice: number; // 합산 및 할인 적용의 총 값
  price: number; // 합산 적용 총 값
  location: string;
  date: Dayjs | null | string;
  paymentId: string;
  couponId: string | undefined;
  discount: number; // 할인 적용 쿠폰의 값
  productPrice: number;
};

const shoppingCartDefaultValue: DefaultValue = {
  username: '',
  phoneNumber: '',
  productName: '',
  storeName: '',
  storeRequest: '',
  options: null,
  additional: null,
  additionalProduct: null,
  price: 0,
  totalPrice: 0,
  location: '',
  date: '',
  productId: '',
  sellerId: '',
  paymentId: '',
  couponId: undefined,
  discount: 0,
  productPrice: 0,
};

export const shoppingCartAtom = atom<DefaultValue | null>({
  key: 'shopping-cart',
  default: shoppingCartDefaultValue,
  effects_UNSTABLE: [persistAtom],
});
