'use client';

import { fetchKakaoLogout, fetchLoginApi } from '@/api/client/auth';
import { setLocationCookie } from '@/config/utils/global';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom } from '@/store/userStore/state';
import { ClientUserInformation } from '@/types/schema/UserSchema';
import { useRecoilState } from 'recoil';

type Message = Omit<ClientUserInformation, 'location_list'>;

export default function Container() {
  const [, setUserInfo] = useRecoilState(UserInfoAtom);

  useReceiveWebviewMessage(
    async (data: Message & { location_list: string }, event) => {
      try {
        if (!data?.socialId || !data?._id) {
          setLocationCookie(data?.latitude, data?.longitude);
          setUserInfo((prev) => ({
            ...prev,
            _id: '',
            socialId: '',
            nickname: '',
            profile_image: '',
            phoneNumber: '',
            provider: '',
            address: data?.address || '',
            longitude: data?.longitude || '',
            latitude: data?.latitude || '',
            location_list: JSON.parse(data?.location_list) || [],
            bottomInsets: data?.bottomInsets ?? 0,
          }));

          await fetchKakaoLogout();

          return (window as any).ReactNativeWebView?.postMessage(
            'DATA_RECEIVED',
          );
        }

        const form = {
          socialId: data?.socialId,
          profile: data?.profile_image,
          fcmToken: data?.fcmToken || '',
          provider: data?.provider,
        };

        const { data: APIData, message } = await fetchLoginApi(form);

        setLocationCookie(data?.latitude, data?.longitude);

        setUserInfo({
          _id: APIData?._id || '',
          nickname: APIData?.nickname || '',
          address: data?.address || '',
          longitude: data?.longitude || '',
          latitude: data?.latitude || '',
          socialId: APIData?.socialId || '',
          profile_image: data?.profile_image || '',
          location_list: JSON.parse(data?.location_list) || [],
          provider: APIData.provider,
          phoneNumber: data?.phoneNumber,
          isAlarm: APIData?.isAlarm,
          isMarketingAlarm: APIData?.isMarketingAlarm,
          bottomInsets: data?.bottomInsets ?? 0,
        });
        (window as any).ReactNativeWebView?.postMessage('DATA_RECEIVED');
      } catch (e) {
        setLocationCookie(data?.latitude, data?.longitude);
        setUserInfo((prev) => ({
          ...prev,
          address: data?.address || '',
          longitude: data?.longitude || '',
          latitude: data?.latitude || '',
          location_list: JSON.parse(data?.location_list) || [],
          bottomInsets: data?.bottomInsets ?? 0,
        }));
        (window as any).ReactNativeWebView?.postMessage('ERROR_GENERATED');
      }
    },
  );

  return null;
}
