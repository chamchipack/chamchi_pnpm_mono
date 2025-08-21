import { useOrderById } from '@/api/server/server-api';
import HeadComponent from '@/components/common/HeadComponent';
import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import { DataStructureKey } from '@/types/schema/default';
import CreationContainer from './create/CreationContainer';

interface Props {
  orderId: string;
  userId: string;
}

type PickData = 'sellerId' | 'productId';

export default async function Container({ userId, orderId }: Props) {
  const { data } = await useOrderById<DataStructureKey.order, 'Pick', PickData>(
    orderId,
  );

  if (!userId || data === null)
    return (
      <ErrorCommonComponent
        title="접근 권한이 없습니다"
        height={'40vh'}
        isBackwardAvailable={false}
        isSigninAvailable={false}
        isHomeRouteAvailable={true}
        isNativeStackInitialize={false}
      />
    );

  const marketName = data?.sellerId?.marketName || '';
  const isDeleted = data?.sellerId?.isDeleted;
  const productName = data?.productId?.name || '';

  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="리뷰 작성" />
      </div>

      <div className="px-4 mt-6">
        <CreationContainer
          marketName={marketName}
          productName={productName}
          userId={userId}
          orderId={orderId}
          isDeleted={isDeleted}
        />
      </div>
    </div>
  );
}
