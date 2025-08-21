'use client';

import { handleNavigation } from '@/config/navigation';
import { isWebView } from '@/config/utils/hooks/isWebView';
import { pageHistoryAtom } from '@/store/routeStore/state';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

interface Props {
  marketName: string;
  alias: string;
}

export default function CSR_ProductHeaderButton({
  marketName = '',
  alias = '',
}: Props) {
  const history = useRecoilValue(pageHistoryAtom);
  const router = useRouter();

  const handleRouterBack = () => {
    if (history.prev || isWebView()) {
      const isWebView = handleNavigation({ path: '', status: 'back' });
      if (!isWebView) router.back();
    } else {
      router.replace(`/store/${alias}`);
    }
  };

  return (
    <div className="flex items-center justify-between h-[50px] relative px-2">
      <div className="w-10">
        <button onClick={handleRouterBack} className="p-1">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 text-center">
        <p className="text-base font-semibold">{marketName}</p>
      </div>

      <div className="w-10 flex justify-end"></div>
    </div>
  );
}
