import { useOrderById } from '@/api/server/server-api';
import HeadComponent from '@/components/common/HeadComponent';
import ErrorPage from '@/components/error/ErrorPage';
import { DataStructureKey } from '@/types/schema/default';
import { cookies } from 'next/headers';
import SSR_PurchaseInformation from './module/SSR_PurchaseInformation';

interface Props {
  orderId: string;
}

export default async function Container({ orderId = '' }: Props) {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};

  if (!value)
    return (
      <ErrorPage
        height="40vh"
        title="로그인 후 이용할 수 있어요!"
        isForAuthentification
      />
    );

  const { data } = await useOrderById<DataStructureKey.order>(orderId);

  if (!data)
    return <ErrorPage height="40vh" title="해당하는 주문내역이 없어요!" />;

  return (
    <div className="py-2">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="주문 상세내역" />
      </div>

      <div className="px-4 mt-6">
        <SSR_PurchaseInformation {...data} />
      </div>
    </div>
  );
}
