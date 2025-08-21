'use client';

import NicknameBox from '@/components/page/Profile/profile/information/NicknameBox';
import NicknameEditDrawer from '@/components/page/Profile/profile/information/NicknameEditDrawer';
import useHandleNickname from './hooks/useHandleNickname';

interface Props {
  nickname: string;
  userId: string;
}

export default function ProfileNameSection({ nickname = '', userId }: Props) {
  const { username, handleClose, handleOpen, open } =
    useHandleNickname(nickname);
  return (
    <>
      <NicknameBox nickname={username} onClick={handleOpen} />
      <NicknameEditDrawer
        open={open}
        userId={userId}
        onOpen={handleOpen}
        onClose={handleClose}
        nickname={username || ''}
      />
    </>
  );
}
