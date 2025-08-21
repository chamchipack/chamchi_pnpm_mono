'use client';

import { CircularProgress } from '@mui/material';

interface Props {
  loading: boolean;
  onClick: () => void;
}

const PaymentButton = ({ loading, onClick }: Props) => {
  return (
    <div className="sticky bottom-0 left-0 bg-white w-full max-w-[480px] mx-auto px-4 py-2">
      <button
        onClick={!loading ? onClick : undefined}
        disabled={loading}
        className={`w-full h-10 text-white rounded-md text-sm font-semibold shadow-md ${
          loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <span>결제하기</span>
        )}
      </button>
    </div>
  );
};

export default PaymentButton;
