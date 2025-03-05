import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const NickNameAtom = atom<string>({
  key: 'NickNameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const AddressAtom = atom<string>({
  key: 'AddressAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

type LocationList = {
  address: string;
  longitude: string;
  latitude: string;
};

enum Provider {
  Kakao = 'kakao',
  Naver = 'naver',
  Google = 'google',
  Apple = 'apple',
}

export enum ProviderConvert {
  kakao = '카카오',
  naver = '네이버',
  google = '구글',
  apple = '애플',
}

type UserInformation = {
  userId: string;
  nickname: string;
  address: string;
  longitude: string;
  latitude: string;
  profile_image?: string;
  location_list?: LocationList[];
  provider: Provider | string;
};

const userDefaultValue = {
  nickname: '',
  address: '',
  longitude: '',
  latitude: '',
  userId: '',
  profile_image: '',
  location_list: [],
  provider: '',
};

export const UserInfoAtom = atom<UserInformation>({
  key: 'UserInfoAtom',
  default: userDefaultValue,
  effects_UNSTABLE: [persistAtom],
});
