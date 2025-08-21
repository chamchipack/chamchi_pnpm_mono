import HeadComponent from '@/components/common/HeadComponent';
import Identification from './identification/Identification';

interface Props {
  searchParams: {
    identityVerificationId: string;
    code: string;
    message: string;
  };
}

export default function AuthContainer({ searchParams }: Props) {
  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="본인인증" />
      </div>

      <div className="px-4">
        <Identification params={searchParams} />
      </div>
    </div>
  );
}
