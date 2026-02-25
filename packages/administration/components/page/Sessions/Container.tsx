import { getSessions } from '@/lib/swr/sessions';
import SessionContainer from './Calendar';
import Title from '@/components/common/layout/Title/Title';

export default async function Container() {
  const data = await getSessions();

  return (
    <>
      <div className="p-8 flex flex-col gap-4">
        <Title title="세션 관리" desc="세션 관리합니다" />
      </div>
      <SessionContainer initialSessions={data} />
    </>
  );
}
