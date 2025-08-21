import AlertModal from '@/components/common/backdrop/AlertModal';
import NavigationBar from '@/components/common/layout/NavigationBar';
import { cookies } from 'next/headers';

export default async function LayoutContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('socialId') || {};

  return (
    <div>
      <div className="max-w-[480px] mx-auto bg-white w-auto relative min-h-dvh shadow-[5px_0_10px_rgba(158,158,158,0.1),-5px_0_10px_rgba(158,158,158,0.1)]">
        {children}

        {/* ✅ 웹 환경에서만 보이도록 설정 */}
        <AlertModal />
      </div>
      <NavigationBar cookie={value} />
    </div>
  );
}
