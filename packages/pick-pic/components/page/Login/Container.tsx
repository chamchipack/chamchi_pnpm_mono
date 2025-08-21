import HeadComponent from '@/components/common/HeadComponent';
import LoginContainer from './LoginContainer';

export default function Container() {
  return (
    <div className="py-4 pb-24">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title="로그인"
          isNativeRoute={false}
        />
      </div>

      <div className="px-4 mt-6">
        <LoginContainer />
      </div>
    </div>
  );
}
