'use client';

import { updatePhoneNumber } from '@/api/client/user';
import { handleStorage } from '@/config/navigation';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom } from '@/store/userStore/state';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

const Page = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const router = useRouter();

  useReceiveWebviewMessage(async (data, event) => {
    if (data === 'VERIFICATION_ERROR')
      return (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'VERIFY_FAILED',
          data: '',
        }),
      );

    try {
      const { identityVerificationId = '' } = data;

      const verificationResult = await fetch('/api/auth/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identityVerificationId }),
      });

      const { identityVerification: { verifiedCustomer = {} } = {} } =
        await verificationResult.json();
      const mobile = verifiedCustomer?.phoneNumber || '';

      await updatePhoneNumber({ userId: userInfo?._id, phoneNumber: mobile });

      setUserInfo((prev) => ({
        ...prev,
        phoneNumber: mobile as string,
      }));

      handleStorage({ data: { key: 'phoneNumber', name: mobile } });

      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'VERIFY_SUCCESS',
          data: '',
        }),
      );
    } catch (e) {
      return (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'VERIFY_FAILED',
          data: '',
        }),
      );
    } finally {
      // handleNavigation({ path: 'user', status: 'replace' });
      // router.replace('/user');
    }
  });
  return <div></div>;
};

export default Page;
