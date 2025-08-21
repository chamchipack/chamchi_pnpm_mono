'use client';

import { useSmartNavigation } from '@/config/navigation';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  path?: string;
  buttonTitle?: string;
  height?: string;
  isForAuthentification?: boolean;
  isButtonVisiable?: boolean;
}

export default function ErrorPage({
  title,
  path,
  buttonTitle,
  height = '100vh',
  isForAuthentification = false,
  isButtonVisiable = true,
}: Props) {
  const smartNavigate = useSmartNavigation();
  const router = useRouter();

  const handleRouter = (targetPath: string) => {
    // smartNavigate({ path: targetPath, status: 'forward' });
    router.replace(`/${targetPath}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ height }}
    >
      <AlertTriangle size={74} className="text-main" />
      <h2 className="mt-4 text-xl font-bold text-main">
        {title ?? '잘못된 접근입니다'}
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        요청하신 페이지를 확인할 수 없습니다.
      </p>

      {isButtonVisiable && (
        <div className="mt-6 flex flex-col gap-3 w-[180px]">
          <button
            onClick={() => handleRouter(path || 'home')}
            className="h-8 bg-main hover:bg-main text-white font-semibold text-sm rounded transition-colors"
          >
            {buttonTitle ?? '홈으로 이동하기'}
          </button>

          {isForAuthentification && (
            <button
              onClick={() => handleRouter('login')}
              className="h-8 bg-main hover:bg-bold-main text-white font-semibold text-sm rounded transition-colors"
            >
              로그인하러 가기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
