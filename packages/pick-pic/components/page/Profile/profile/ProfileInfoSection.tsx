'use client';

import React, { useMemo, useState } from 'react';
import NicknameBox from './information/NicknameBox';
import NicknameEditDrawer from './information/NicknameEditDrawer';

interface Props {
  nickname: string;
  userId: string;
}

const ProfileInfoSection = ({ nickname = '', userId }: Props) => {
  const [open, setOpen] = useState(false);

  const username = useMemo(() => nickname ?? '로딩 중...', [nickname]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
};

export default React.memo(ProfileInfoSection);
