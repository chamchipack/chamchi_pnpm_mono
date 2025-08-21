'use client';

import { handleNavigation } from '@/config/navigation';
import { ArrowLeft, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  isLeftButtonVisable?: boolean;
  title: string;
  isRoutingReplace?: boolean;
  path?: string;
  isRightButtonVisable?: boolean;
  rightButtonIcon?: ReactNode;
  onRightButtonClick?: () => void;
  isNativeRoute?: boolean;
}

export default function HeadComponent({
  isLeftButtonVisable = false,
  title = '',
  isRoutingReplace = false,
  path = '',
  isRightButtonVisable = false,
  rightButtonIcon = <Settings size={18} />,
  onRightButtonClick,
  isNativeRoute = true,
}: Props) {
  const router = useRouter();

  const handleRouter = () => {
    if (!isLeftButtonVisable) return;

    if (!isNativeRoute) {
      return isRoutingReplace ? router.push(`/${path}`) : router.back();
    }

    const isWebView = handleNavigation({
      path: isRoutingReplace ? path : '',
      status: isRoutingReplace ? 'replace' : 'back',
    });

    if (!isWebView) {
      isRoutingReplace ? router.push(`/${path}`) : router.back();
    }
  };

  return (
    <div className="flex items-center justify-between h-[50px] relative px-2">
      {/* 왼쪽 버튼 */}
      <div className="w-10">
        {isLeftButtonVisable && (
          <button onClick={handleRouter} className="p-1">
            <ArrowLeft size={20} />
          </button>
        )}
      </div>

      {/* 중앙 타이틀 */}
      <div className="flex-1 text-center">
        <p className="text-base font-semibold">{title}</p>
      </div>

      {/* 오른쪽 버튼 */}
      <div className="w-10 flex justify-end">
        {isRightButtonVisable && (
          <button onClick={onRightButtonClick} className="p-1">
            {rightButtonIcon}
          </button>
        )}
      </div>
    </div>
  );
}
