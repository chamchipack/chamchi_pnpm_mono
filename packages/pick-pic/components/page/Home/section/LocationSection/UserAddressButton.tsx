'use client';

import { ChevronDown } from 'lucide-react'; // MUI 대신 lucide 아이콘 사용
import { useNotificationFetch } from './hooks/useNotificationFetch';
import { useUserAddress } from './hooks/useUserAddress';

export default function UserAddressButton() {
  const address = useUserAddress();
  const { handleRouter } = useNotificationFetch();

  return (
    <div
      className="flex flex-row items-center cursor-pointer"
      onClick={() => handleRouter('address', false)}
    >
      <div className="flex items-center gap-1 max-w-full overflow-hidden">
        <span
          className={`text-sm truncate ${address ? 'font-semibold' : ''} ${address ? 'underline' : ''} ${address ? 'text-gray-800' : 'text-gray-500'}`}
        >
          {address || '여기를 눌러 주소를 찾아요!'}
        </span>
        <ChevronDown size={20} className="text-gray-800" />
      </div>
    </div>
  );
}
