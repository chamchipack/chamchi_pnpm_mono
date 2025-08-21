import { useSmartNavigation } from '@/config/navigation';
import { useEffect, useState } from 'react';

export default function useMobileRouter(phoneNumber: string) {
  const smartNavigate = useSmartNavigation();
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    setMobile(phoneNumber);
  }, [phoneNumber]);

  const isVerified = Boolean(mobile);

  return { smartNavigate, isVerified };
}
