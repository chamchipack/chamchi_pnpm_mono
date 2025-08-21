'use client';

import { updateNickname } from '@/api/client/user';
import { handleStorage } from '@/config/navigation';
import { UserInfoAtom } from '@/store/userStore/state';
import { Backdrop } from '@mui/material'; // 백드롭만 유지
import { Loader2 } from 'lucide-react';

import InputTextField from '@/components/page/Store/product/product/common/InputTextField';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { ResponseStatus } from '@/types/enums/enums';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface Props {
  open: boolean;
  userId: string;
  onOpen: () => void;
  onClose: () => void;
  nickname: string;
}

const CommonSwipeableDrawer = dynamic(
  () => import('@/components/common/backdrop/CommonSwipeableDrawer'),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function NicknameEditDrawer({
  open,
  onOpen,
  onClose,
  nickname: name,
  userId,
}: Props) {
  const router = useRouter();
  const alert = useAlert();

  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setRecoilUser = useSetRecoilState(UserInfoAtom);

  useEffect(() => {
    setNickname(name);
  }, [name]);

  const handleSave = async () => {
    setIsLoading(true);
    const { message, status } = await updateNickname(userId, nickname);

    if (status === ResponseStatus.error) {
      return alert({
        message,
        type: status,
      });
    }

    handleStorage({ data: { key: 'nickname', name: nickname } });

    setRecoilUser((prev) => ({ ...prev, nickname }));

    alert({
      message,
      type: status,
    });
    router.refresh();

    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <>
      <CommonSwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        maxHeight="40vh"
        minHeight="50vh"
      >
        <div className="flex flex-col justify-between h-full px-4 py-6">
          <div>
            <p className="text-sm font-bold mb-2">닉네임 수정</p>
            <InputTextField
              value={nickname}
              setValue={setNickname}
              inputMaxLength={8}
              isMaxLengthOn={true}
            />
          </div>
          <button
            className="w-full h-11 bg-main text-white font-bold text-sm rounded hover:bg-red-400"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </CommonSwipeableDrawer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Loader2 className="w-6 h-6 animate-spin text-white" />
      </Backdrop>
    </>
  );
}
