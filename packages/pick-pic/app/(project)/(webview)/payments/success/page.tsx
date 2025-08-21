'use client';
import { handleNavigation } from '@/config/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const re = searchParams.get('redirecturl');
  const code = searchParams.get('code');
  const paymentId = searchParams.get('paymentId');

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'order-complete',
      status: 'replace',
    });

    if (!isWebView) {
      router.replace(`/order-complete`);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('access_to_success', 'granted');
    if (code === 'FAILURE_TYPE_PG' && re) {
      return router.replace(re);
    } else if (code === 'PORTONE_ERROR') {
      return router.replace(`/order-failed`);
    } else if (paymentId) handleRouter();
    else handleRouter();
  }, []);

  return null;
}
