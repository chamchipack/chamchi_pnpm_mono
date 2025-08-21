'use client';

import { UserInfoAtom } from '@/store/userStore/state';
import { ChevronDown, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  isClickAvailable: boolean;
};

export default function CurrentLocationTypo({
  isClickAvailable = false,
}: Props) {
  const router = useRouter();
  const location = useRecoilValue(UserInfoAtom);
  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(location.address);
  }, [location.address]);

  if (!address) return null;

  const handleRouter = () => {
    if (isClickAvailable) {
      router.push('/address');
    }
  };

  return (
    <div className="flex items-center">
      <MapPin size={16} color="gray" />
      <span
        onClick={handleRouter}
        className={`ml-1 text-xs font-semibold truncate max-w-[150px] ${
          isClickAvailable ? 'cursor-pointer hover:underline' : 'cursor-default'
        }`}
      >
        {address}
      </span>
      <ChevronDown size={20} className="text-black ml-1" />
    </div>
  );
}
