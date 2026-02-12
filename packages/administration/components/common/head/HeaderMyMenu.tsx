'use client';

import { useHeaderMyMenu } from './hooks/useHeaderMyMenu';
import HeaderMyMenuView from './HeaderMyMenuView';

export default function HeaderMyMenu() {
  const { ref, open, toggle } = useHeaderMyMenu();

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
      <HeaderMyMenuView
        open={open}
        onToggle={toggle}
        onLogout={() => {
          console.log('logout');
        }}
      />
    </div>
  );
}
