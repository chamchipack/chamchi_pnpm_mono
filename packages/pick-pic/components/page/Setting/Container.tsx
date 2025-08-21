import HeadComponent from '@/components/common/HeadComponent';
import AccountActions from '../Profile/profile/AccountActions';
import SettingBox from './SettingBox';

export default function Container() {
  return (
    <>
      <div className="py-4">
        <div className="px-4">
          <HeadComponent isLeftButtonVisable={true} title="나의 설정" />
        </div>

        <div className="px-4 mt-6">
          <SettingBox />
        </div>

        <div className="px-4 mt-6">
          <AccountActions />
        </div>
      </div>
    </>
  );
}
