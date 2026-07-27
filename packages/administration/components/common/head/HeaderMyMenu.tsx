'use client';

import { useHeaderMyMenu } from './hooks/useHeaderMyMenu';
import HeaderMyMenuView from './HeaderMyMenuView';
import { logout } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export default function HeaderMyMenu() {
  const { ref, open, toggle } = useHeaderMyMenu();

  const router = useRouter();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push('/signin');
      router.refresh();
    }
  };

  return (
    <div
      ref={ref}
      className="
        fixed
        bottom-15
        right-0
        z-50
        h-16
        px-4
        flex
        items-center
      "
    >
      <HeaderMyMenuView open={open} onToggle={toggle} onLogout={handleLogout} />
    </div>
  );
}
