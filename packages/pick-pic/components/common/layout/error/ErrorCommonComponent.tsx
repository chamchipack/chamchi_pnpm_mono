'use client';

import { useSmartNavigation } from '@/config/navigation';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  height: string;
  isBackwardAvailable: boolean;
  isSigninAvailable: boolean;
  isHomeRouteAvailable: boolean;
  isNativeStackInitialize: boolean;
}

/**
 *
 * @param height: ex) "50%", "90vh" "200px"
 * @returns
 */
export default function ErrorCommonComponent({
  title,
  height = '90vh',
  isBackwardAvailable = false,
  isSigninAvailable = false,
  isHomeRouteAvailable = false,
  isNativeStackInitialize = false,
}: Props) {
  const router = useRouter();
  const smartNavigate = useSmartNavigation();

  const handleBackRouter = () => smartNavigate({ path: '', status: 'back' });

  const handleSigninRouter = () => router.replace('/login');

  const handleHomeRouter = () =>
    smartNavigate({ path: 'home', status: 'replace' });

  const handleStackInitialize = () => {
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      return (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'STACK_INITIALIZE',
          data: '',
        }),
      );
    } else router.replace('/');
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ height }}
      >
        <AlertTriangle size={74} className="text-main" />
        <h2 className="mt-4 text-xl font-bold text-main">
          {title ?? '잘못된 접근입니다'}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          요청하신 정보를 확인할 수 없습니다.
        </p>

        {isBackwardAvailable && (
          <div className="my-2">
            <button
              onClick={handleBackRouter}
              className="w-auto min-w-[150px] h-8 px-4 bg-main hover:bg-main text-white font-semibold text-sm rounded transition-colors"
            >
              뒤로가기
            </button>
          </div>
        )}

        {isSigninAvailable && (
          <div className="my-2">
            <button
              onClick={handleSigninRouter}
              className="w-auto min-w-[150px] h-8 px-4 bg-main hover:bg-main text-white font-semibold text-sm rounded transition-colors"
            >
              로그인하러 가기
            </button>
          </div>
        )}

        {isHomeRouteAvailable && (
          <div className="my-2">
            <button
              onClick={handleHomeRouter}
              className="w-auto min-w-[150px] h-8 px-4 bg-main hover:bg-main text-white font-semibold text-sm rounded transition-colors"
            >
              홈으로 가기
            </button>
          </div>
        )}

        {isNativeStackInitialize && (
          <div className="my-2">
            <button
              onClick={handleStackInitialize}
              className="w-auto min-w-[150px] h-8 px-4 bg-main hover:bg-main text-white font-semibold text-sm rounded transition-colors"
            >
              홈으로 가기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
