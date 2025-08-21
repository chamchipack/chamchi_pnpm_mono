import { useRouter } from 'next/navigation';

const useSearchInput = () => {
  const router = useRouter();

  const handleRouter = () => router.push('/search');
  const handlePrefetch = () => router.prefetch('/search');

  return { handleRouter, handlePrefetch };
};

export default useSearchInput;
