'use client';

import { useMemo, useState } from 'react';

export default function useHandleNickname(nickname: string) {
  const [open, setOpen] = useState(false);

  const username = useMemo(() => nickname ?? '로딩 중...', [nickname]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleClose, handleOpen, username };
}
