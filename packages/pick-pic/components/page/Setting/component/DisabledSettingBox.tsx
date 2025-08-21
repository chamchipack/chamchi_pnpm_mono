import TextToggle from './TextToggle';

export default function DisabledSettingBox() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-800">
        알림 전체 설정
      </span>
      <TextToggle isOn={false} onClick={() => {}} disabled={true} />
    </div>
  );
}
