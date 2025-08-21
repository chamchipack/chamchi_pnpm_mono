import { SocialProviderEnum } from '@/types/enums/enums';

const fetchAPI = async (url: string, data?: object) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API 요청 중 오류 발생 (${url}):`, error);
    throw error;
  }
};

// ✅ 카카오 로그인 요청
export const fetchKakaoAuthClient = (code: string) =>
  fetchAPI('/api/auth/kakao', { code });

// ✅ 카카오 로그아웃 요청
export const fetchKakaoLogout = () =>
  fetchAPI('/api/auth/logout', { socialId: '' });

type SigninData = {
  _id: string;
  nickname: string;
  socialId: string;
  provider: SocialProviderEnum.apple | SocialProviderEnum.kakao;
  isAlarm: boolean;
  isMarketingAlarm: boolean;
  phoneNumber?: string;
};

type Signin = { data: SigninData; message: string };

export const fetchLoginApi = (form: any): Promise<Signin> =>
  fetchAPI('/api/auth/login', form);
