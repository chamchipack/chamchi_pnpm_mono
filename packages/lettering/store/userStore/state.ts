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

type UserInformation = {
  userId: string;
  nickname: string;
  address: string;
  longitude: string;
  latitude: string;
  profile_image?: string;
};

const userDefaultValue = {
  nickname: '',
  address: '',
  longitude: '',
  latitude: '',
  userId: '',
  profile_image: '',
};

export const UserInfoAtom = atom<UserInformation>({
  key: 'UserInfoAtom',
  default: userDefaultValue,
  effects_UNSTABLE: [persistAtom],
});
