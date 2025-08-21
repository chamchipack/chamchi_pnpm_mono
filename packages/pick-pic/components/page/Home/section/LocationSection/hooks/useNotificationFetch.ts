import { useSmartNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export const useNotificationFetch = () => {
  const router = useRouter();
  const smartNavigate = useSmartNavigation();

  const handleClick = () => router.push('/notification');
  const handlePrefetch = () => router.prefetch('/notification');

  const handleRouter = (path: string, forWebview: boolean) => {
    if (!forWebview) return router.push(`/${path}`);
    smartNavigate({ path, status: 'forward' });
  };

  return { handleClick, handlePrefetch, handleRouter };
};
