import { AlertTriangle } from 'lucide-react';
import PortoneIdentification from './PortoneIdentification';

interface Props {
  params: {
    identityVerificationId: string;
    code: string;
    message: string;
  };
}

const Identification = ({ params }: Props) => {
  return (
    <div className="w-full mt-6">
      {/* 설명 텍스트 */}
      <div className="flex flex-col px-2 mb-4">
        <h2 className="text-lg font-bold">본인인증을 진행합니다</h2>
        <p className="text-sm text-gray-500 mt-2">본인인증을 완료해주세요.</p>
      </div>

      {/* 본인인증 버튼 */}
      <PortoneIdentification params={params} />

      {/* 경고 문구 */}
      <div className="flex items-start gap-2 mt-4 px-2">
        <AlertTriangle className="text-orange-400 w-4 h-4 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          입력하신 휴대폰 번호는 가맹점과 고객 간의 원활한 소통과 주문 안내를
          위한 카카오톡 알림 발송의 용도로만 활용되고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Identification;
