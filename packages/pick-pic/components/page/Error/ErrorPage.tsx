'use client';

import { useSmartNavigation } from '@/config/navigation';
import { AlertTriangle } from 'lucide-react';

interface Props {
  title?: string;
  path?: string;
  buttonTitle?: string;
  height?: string;
  isForAuthentification?: boolean;
  isButtonVisiable?: boolean;
}

const ErrorPage = ({
  title,
  path,
  buttonTitle,
  height,
  isForAuthentification = false,
  isButtonVisiable = true,
}: Props) => {
  const smartNavigate = useSmartNavigation();

  const handleRouter = (targetPath: string) => {
    smartNavigate({ path: targetPath, status: 'forward' });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        height ? '' : 'h-screen'
      }`}
      style={{ height: height || undefined }}
    >
      <AlertTriangle className="w-16 h-16 text-main" />

      <p className="text-lg font-bold text-main mt-4">
        {title ?? '잘못된 접근입니다'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        요청하신 페이지를 확인할 수 없습니다.
      </p>

      {isButtonVisiable && (
        <div className="flex flex-col gap-2 mt-6 w-[200px]">
          <button
            onClick={() => handleRouter(path || 'home')}
            className="h-8 rounded-full bg-main text-white font-semibold"
          >
            {buttonTitle ?? '홈으로 이동하기'}
          </button>

          {isForAuthentification && (
            <button
              onClick={() => handleRouter('login')}
              className="h-8 rounded-full bg-main text-white font-semibold"
            >
              로그인하러 가기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
