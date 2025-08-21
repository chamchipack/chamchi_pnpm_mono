'use client';

import { useRouter } from 'next/navigation';

export default function useRouteFetch() {
  const router = useRouter();

  const handleRoute = () => router.push('populars');

  const handlePrefetch = () => router.prefetch('/populars');

  return { handlePrefetch, handleRoute };
}
