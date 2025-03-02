'use client';
import { handleNavigation } from '@/config/navigation';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  loadTossPayments,
  TossPaymentsSDK,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const clientKey: string = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey: string = 'SiGXsyFsHU_REoW-oxiSS';

interface Amount {
  currency: 'KRW';
  value: number;
}

export default function Container() {
  const router = useRouter();
  const [amount, setAmount] = useState<Amount>({
    currency: 'KRW',
    value: 100,
  });

  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const handleRouter = () => {
    let path = `/application/home`;
    const isWebView = handleNavigation({ path: 'order', status: 'forward' });

    if (!isWebView) return router.back();
  };

  const handleRouterBack = () => {
    const isWebView = handleNavigation({
      path: '',
      status: 'back',
    });

    if (!isWebView) {
      router.back();
    }
  };

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ✅ 결제 위젯 초기화
      const tossPayments: TossPaymentsSDK = await loadTossPayments(clientKey);

      // ✅ 회원 결제
      const paymentWidget: TossPaymentsWidgets = tossPayments.widgets({
        customerKey,
      });

      // ✅ 비회원 결제 (필요 시 사용)
      // const paymentWidget: PaymentWidgetInstance = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(paymentWidget);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) return;

      // ✅ 결제 금액 설정
      await widgets.setAmount(amount);

      await Promise.all([
        // ✅ 결제 UI 렌더링
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ✅ 이용약관 UI 렌더링
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets === null) return;
    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="wrapper">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          p: 2,
        }}
      >
        <IconButton onClick={handleRouterBack}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography
          onClick={handleRouterBack}
          variant="subtitle1"
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          눌러서 뒤로가기
        </Typography>
      </Box>
      <div className="box_section">
        {/* ✅ 결제 UI */}
        <div id="payment-method" />
        {/* ✅ 이용약관 UI */}
        <div id="agreement" />

        {/* ✅ 쿠폰 체크박스 */}
        {/* <div>
          <div>
            <label htmlFor="coupon-box">
              <input
                id="coupon-box"
                type="checkbox"
                disabled={!ready}
                onChange={(event) => {
                  setAmount((prevAmount) => ({
                    currency: 'KRW',
                    value: event.target.checked
                      ? prevAmount.value - 5_000
                      : prevAmount.value + 5_000,
                  }));
                }}
              />
              <span>5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div> */}

        {/* ✅ 결제하기 버튼 */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            px: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: '#3481F8',
              height: 50,
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              ':hover': { background: '#2A6BCC' },
            }}
            disabled={!ready}
            onClick={async () => {
              try {
                if (!widgets) return;
                const s = await widgets.requestPayment({
                  orderId: 'zLdSlAyyH-2adj7PuLRVN',
                  orderName: '토스 티셔츠 외 2건',
                  successUrl:
                    window.location.origin + '/application/payments/success',
                  failUrl: window.location.origin + '/application/payments',
                  customerEmail: 'customer123@gmail.com',
                  customerName: '김토스',
                  customerMobilePhone: '01012341234',
                });

                console.log(s);
              } catch (error) {
                handleRouter();
                console.error(error);
              }
            }}
          >
            {amount.value}원 결제하기
          </Button>
        </Box>
      </div>
    </div>
  );
}
