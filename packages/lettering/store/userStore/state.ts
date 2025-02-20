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
  nickname: string;
  address: string;
  longitude: string;
  latitude: string;
};

const userDefaultValue = {
  nickname: '',
  address: '',
  longitude: '',
  latitude: '',
};

export const UserInfoAtom = atom<UserInformation>({
  key: 'UserInfoAtom',
  default: userDefaultValue,
  effects_UNSTABLE: [persistAtom],
});
