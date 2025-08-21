'use client';

import { updateAlarms } from '@/api/client/user';
import { handleStorage } from '@/config/navigation';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom, useUserInfoKeys } from '@/store/userStore/state';
import { ResponseStatus } from '@/types/enums/enums';
import { AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ToggleButton from './ToggleButton';

const ActionConfirmationModal = dynamic(
  () => import('@/components/common/backdrop/ActionConfirmationModal'),
  { ssr: false, loading: () => null },
);

const settings = {
  isMarketingAlarm: {
    label: '마케팅 목적의 알림',
    text: '이벤트와 할인 소식을 빠르게 받아볼 수 있습니다',
  },
  isAlarm: {
    label: '주문현황 알림',
    text: '주문 진행 상황을 실시간으로 알려드립니다.',
  },
};

type SettingKey = keyof typeof settings;

export default function WebViewSettingBox() {
  const alert = useAlert();
  const {
    isAlarm,
    isMarketingAlarm,
    _id: userId,
  } = useUserInfoKeys(['isAlarm', 'isMarketingAlarm', '_id']);

  const setUser = useSetRecoilState(UserInfoAtom);

  const [isPermitted, setIsPermitted] = useState(true);

  const [open, setOpen] = useState(false);
  const [loading, isLoading] = useState(true);
  const [pendingKey, setPendingKey] = useState<SettingKey | null>(null);

  const [toggles, setToggles] = useState<Record<SettingKey, boolean>>({
    isAlarm: false,
    isMarketingAlarm: false,
  });

  useReceiveWebviewMessage(async (data, event) => {
    const { result = false } = data;

    setIsPermitted(result);
  });

  useEffect(() => {
    (window as any).ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'ALERT_PERMISSION',
        data: '',
      }),
    );
  }, []);

  useEffect(() => {
    const nextToggles = {
      isAlarm: isAlarm ?? false,
      isMarketingAlarm: isMarketingAlarm ?? false,
    };
    setToggles(nextToggles);

    isLoading(false);
  }, [isAlarm, isMarketingAlarm]);

  const updateToggle = async (update: Partial<Record<SettingKey, boolean>>) => {
    const { message, status } = await updateAlarms(userId, update);

    if (status === ResponseStatus.error) {
      alert({ message: message || '오류가 발생했어요!', type: 'error' });
      return false;
    }

    const keysToStore: SettingKey[] = ['isAlarm', 'isMarketingAlarm'];

    const filteredEntries = Object.entries(update).filter(([key]) =>
      keysToStore.includes(key as SettingKey),
    ) as [SettingKey, boolean][];

    if (filteredEntries.length > 1) {
      handleStorage({
        data: {
          multiple: true,
          data: filteredEntries.map(([key, value]) => ({
            key,
            name: value,
          })),
        },
      });
    } else if (filteredEntries.length === 1) {
      const [key, value] = filteredEntries[0];
      handleStorage({
        data: {
          key,
          name: value,
        },
      });
    }

    setUser((prev) => ({ ...prev, ...update }));
    setToggles((prev) => ({ ...prev, ...update }));
    return true;
  };

  const handleToggleClick = (key: SettingKey) => {
    const current = toggles[key];
    if (current) {
      setPendingKey(key);
      setOpen(true);
    } else {
      updateToggle({ [key]: true });
    }
  };

  const handleConfirm = async () => {
    if (pendingKey) {
      const success = await updateToggle({ [pendingKey]: false });
      if (success) {
        setPendingKey(null);
        setOpen(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {/* 항목 1 */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="w-[32px] h-[20px] bg-gray-300 rounded-full" />
          </div>
          <div className="h-4 w-56 mt-1 bg-gray-100 rounded" />
        </div>

        {/* 항목 2 */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="w-[32px] h-[20px] bg-gray-300 rounded-full" />
          </div>
          <div className="h-3 w-56 mt-1 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {!isPermitted ? (
          <div className="flex items-start gap-2 bg-blue-50 px-3 py-2 rounded-md">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            <span className="text-sm text-gray-500">
              현재 알림 권한이 꺼져 있습니다. 알림을 받으려면 설정에서 권한을
              허용해주세요.
            </span>
          </div>
        ) : null}

        {/* ✅ 세부 항목 설정 */}
        {(
          Object.entries(settings) as [
            SettingKey,
            (typeof settings)[SettingKey],
          ][]
        ).map(([key, { label, text }]) => (
          <div key={key} className="mb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">{label}</span>
              <ToggleButton
                isOn={toggles[key]}
                onClick={() => handleToggleClick(key)}
                size="sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{text}</p>
          </div>
        ))}
      </div>

      <ActionConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setPendingKey(null);
        }}
        onClickCheck={handleConfirm}
        title={pendingKey ? settings[pendingKey].label : '알림 끄기'}
        content={'알람을 비활성화 하시겠어요?'}
        processing={false}
      />
    </>
  );
}
