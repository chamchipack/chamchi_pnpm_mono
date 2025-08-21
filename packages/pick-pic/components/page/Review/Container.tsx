import HeadComponent from '@/components/common/HeadComponent';
import ReviewListContainer from './review/ReviewListContainter';

interface Props {
  sellerId: string;
}

export default function Container({ sellerId = '' }: Props) {
  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="리뷰" />
      </div>

      <div className="px-4">
        <ReviewListContainer sellerId={sellerId} />
      </div>
    </div>
  );
}
