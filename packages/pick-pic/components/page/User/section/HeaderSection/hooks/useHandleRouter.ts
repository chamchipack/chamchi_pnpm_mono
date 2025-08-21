'use client';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export default function useHandleRouter() {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/user/setting`;
    const isWebView = handleNavigation({
      path: 'user/setting',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

  return { handleRouter };
}
