'use client';

import { ShieldCheck, ShieldX } from 'lucide-react';
import useMobileRouter from './hooks/useMobileRoute';

export default function MobileAuthentificationSection({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  const { smartNavigate, isVerified } = useMobileRouter(phoneNumber);

  return (
    <div
      onClick={() => {
        if (!isVerified)
          smartNavigate({ path: 'authentification', status: 'forward' });
      }}
      className={`w-fit px-3 h-[28px] rounded-full transition-all cursor-pointer
${
  isVerified
    ? 'bg-green-100 text-green-700'
    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}
`}
    >
      <div className="flex items-center gap-1 text-xs font-medium leading-tight h-full">
        {isVerified ? (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span className="relative top-[0.5px]">본인인증 완료</span>
          </>
        ) : (
          <>
            <ShieldX className="w-3 h-3" />
            <span className="relative top-[0.5px]">본인인증이 필요합니다</span>
          </>
        )}
      </div>
    </div>
  );
}
