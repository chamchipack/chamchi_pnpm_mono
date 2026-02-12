import { cookies } from 'next/headers';
import NavigationBar from '@/components/common/layout/NavigationBar';
import HeaderMyMenu from '@/components/common/head/HeaderMyMenu';

export default async function LayoutContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const { value = '' } = cookieStore.get('socialId') || {};

  return (
    <div className="min-h-dvh bg-neutral-100 flex justify-center">
      <div
        className="
          relative
          w-full
          bg-white
          min-h-dvh
          pb-16
          shadow-[5px_0_10px_rgba(158,158,158,0.1),-5px_0_10px_rgba(158,158,158,0.1)]
        "
      >
        {children}
        <HeaderMyMenu />
        <NavigationBar cookie={value} />
      </div>
    </div>
  );
}
