'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'order-failed',
      status: 'forward',
    });

    if (!isWebView) {
      router.replace(`/application/order-failed`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentKey = params.get('paymentKey'); // ✅ 결제 키
    const orderId = params.get('orderId'); // ✅ 주문 ID
    const amount = params.get('amount'); // ✅ 결제 금액

    console.log('결제 성공:', { paymentKey, orderId, amount });

    // 예: 결제 완료 페이지로 이동
    handleRouter();
  }, []);

  return <div></div>;
}
