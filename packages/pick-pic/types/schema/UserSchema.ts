import { SocialProviderEnum } from '../enums/enums';

// ✅ User 테이블
export interface UserSchema {
  _id: string;
  socialId: string;
  provider: SocialProviderEnum;
  fcmToken: string;
  profile: string;
  nickname: string;
  phoneNumber: string;
  point: number;
  isAlarm: boolean;
  isMarketingAlarm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type LocationList = {
  address: string;
  longitude: string;
  latitude: string;
};

export type ClientUserInformation = {
  _id: string;
  socialId: string;
  nickname: string;
  address: string;
  longitude: string;
  latitude: string;
  profile_image?: string;
  location_list?: LocationList[];
  provider: SocialProviderEnum | string;
  fcmToken?: string;
  isAlarm?: boolean;
  isMarketingAlarm?: boolean;
  phoneNumber?: string;
  bottomInsets?: number;
};
