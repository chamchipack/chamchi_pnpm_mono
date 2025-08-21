'use client';

import { updatePhoneNumber } from '@/api/client/user';
import { handleNavigation } from '@/config/navigation';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import useIsMobile from '@/config/utils/webview/useIsMobile';
import { UserInfoAtom } from '@/store/userStore/state';
import { ResponseStatus } from '@/types/enums/enums';
import PortOne from '@portone/browser-sdk/v2';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  params: {
    identityVerificationId: string;
    code: string;
    message: string;
  };
}

const PortoneIdentification = ({ params }: Props) => {
  const alert = useAlert();
  const router = useRouter();
  const isMobile = useIsMobile();
  const hasDone = useRef<boolean | null>(null);

  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const { identityVerificationId = '', code, message: pgMessage } = params;

  const handleVerifyInformation = async (verificationId: string) => {
    try {
      const verificationResult = await fetch('/api/auth/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identityVerificationId: verificationId }),
      });

      const { status, identityVerification: { verifiedCustomer = {} } = {} } =
        await verificationResult.json();

      if (status === ResponseStatus.error) {
        setLoading(false);
        return alert({
          message: '본인인증 중 문제가 발생했습니다',
          type: 'error',
        });
      }

      const mobile = verifiedCustomer?.phoneNumber || '';

      await updatePhoneNumber({ userId: userInfo?._id, phoneNumber: mobile });

      setUserInfo((prev) => ({
        ...prev,
        phoneNumber: mobile as string,
      }));

      setIsVerified(true);
      alert({ message: '본인인증이 완료되었습니다!', type: 'success' });

      setTimeout(() => {
        router.replace('/user');
      }, 500);
    } catch (e) {
      alert({ message: '본인인증 중 문제가 발생했습니다', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasDone.current) return;
    hasDone.current = true;

    if (identityVerificationId && !code) {
      handleVerifyInformation(identityVerificationId);
    } else if (code) {
      alert({ message: '본인인증 중 문제가 발생했습니다', type: 'error' });
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [identityVerificationId, code, pgMessage, router]);

  const handleIdentification = async () => {
    const isWebView = handleNavigation({
      path: 'authentification/verification',
      status: 'forward',
    });
    if (isWebView) return;

    try {
      setLoading(true);

      const response: any = await PortOne.requestIdentityVerification({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STOREID || '',
        identityVerificationId: `identity-verification-${Date.now()}`,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_IDENTITY_CHANNELKEY || '',
        windowType: {
          pc: 'POPUP',
          mobile: 'REDIRECTION',
        },
        ...(isMobile
          ? { redirectUrl: `${window.location.origin}/authentification` }
          : {}),
      });

      if (isMobile) return;

      if (response.code !== undefined)
        return alert({ message: response?.message, type: 'error' });

      const { identityVerificationId } = response;

      handleVerifyInformation(identityVerificationId);
    } catch (error) {
      alert({ message: '본인인증 중 문제가 발생했습니다', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className={`w-full h-10 text-white font-bold text-sm rounded ${
          loading || isVerified
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-main hover:bg-main'
        }`}
        disabled={loading || isVerified}
        onClick={loading ? undefined : handleIdentification}
      >
        {loading
          ? '처리 중...'
          : isVerified
            ? '본인인증 완료됨'
            : '본인인증 진행하기'}
      </button>
    </div>
  );
};

export default React.memo(PortoneIdentification);
