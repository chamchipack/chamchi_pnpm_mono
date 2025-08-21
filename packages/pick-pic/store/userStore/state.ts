import { ClientUserInformation } from '@/types/schema/UserSchema';
import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const AddressAtom = atom<string>({
  key: 'AddressAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const userDefaultValue: ClientUserInformation = {
  _id: '',
  nickname: '',
  address: '',
  longitude: '',
  latitude: '',
  socialId: '',
  profile_image: '',
  location_list: [],
  provider: '',
  fcmToken: '',
  isAlarm: false,
  isMarketingAlarm: false,
  phoneNumber: '',
  bottomInsets: 0,
};

export const UserInfoAtom = atom<ClientUserInformation>({
  key: 'UserInfoAtom',
  default: userDefaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const useUserInfoKeys = <K extends keyof ClientUserInformation>(
  keys: K[],
): Pick<ClientUserInformation, K> => {
  const user = useRecoilValue(UserInfoAtom);
  const selected = {} as Pick<ClientUserInformation, K>;
  keys.forEach((key) => {
    selected[key] = user[key];
  });
  return selected;
};
