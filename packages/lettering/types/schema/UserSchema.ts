enum Provider {
  Kakao = 'kakao',
  Naver = 'naver',
  Google = 'google',
}

// ✅ User 테이블
interface UserSchema {
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
