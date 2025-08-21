import { Dayjs } from 'dayjs';
import { atom, useRecoilValue } from 'recoil';
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
  isParcelAvailable: boolean;
  parcelLocation: string | null;
  parcelLocationDetail: string | null;
  parcelFee: number;
};

const selectedProductDefaultValue: DefaultValue = {
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
  isParcelAvailable: false,
  parcelLocation: null,
  parcelLocationDetail: null,
  parcelFee: 0,
};

export const selectedProductAtom = atom<DefaultValue | null>({
  key: 'selected-product',
  default: selectedProductDefaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const useProductInfoKeys = <K extends keyof DefaultValue>(
  keys: K[],
): Pick<DefaultValue, K> => {
  const order = useRecoilValue(selectedProductAtom);
  const safeOrder = order ?? ({} as DefaultValue); // null인 경우 빈 객체 대체

  const selected = {} as Pick<DefaultValue, K>;

  keys.forEach((key) => {
    selected[key] = safeOrder[key];
  });
  return selected;
};
