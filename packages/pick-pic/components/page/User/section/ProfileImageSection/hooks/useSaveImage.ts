'use client';

import { updateProfileImage } from '@/api/client/user';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { ResponseStatus } from '@/types/enums/enums';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useSaveImage(
  userId: string,
  selectedFile: File | null,
) {
  const router = useRouter();
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const saveImage = async () => {
    if (!selectedFile) return console.error('저장할 파일이 없습니다.');

    setProcessing(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    const { message = '', status } = await updateProfileImage(formData, userId);

    alert({
      message,
      type: status,
    });

    if (status === ResponseStatus.success) router.refresh();
    setProcessing(false);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    processing,
    saveImage,
  };
}
