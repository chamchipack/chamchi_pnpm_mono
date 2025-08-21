'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import useChangeImage from './hooks/useChangeImage';
import useSaveImage from './hooks/useSaveImage';

interface Props {
  profile: string;
  userId: string;
}

const ActionConfirmationModal = dynamic(
  () => import('@/components/common/backdrop/ActionConfirmationModal'),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function ProfileImageSection({ profile, userId }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { open, setOpen, processing, saveImage } = useSaveImage(
    userId,
    selectedFile,
  );

  const {
    isValidImage,
    selectedImage,
    setImageError,
    handleImageChange,
    hasChanged,
  } = useChangeImage(profile, setSelectedFile);
  return (
    <>
      <div className="flex items-center justify-center relative">
        {isValidImage ? (
          <img
            src={selectedImage}
            alt="User Profile"
            className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
            onClick={() =>
              document.getElementById('profile-image-input')?.click()
            }
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="w-[80px] h-[80px] rounded-full bg-gray-300 cursor-pointer"
            onClick={() =>
              document.getElementById('profile-image-input')?.click()
            }
          />
        )}

        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {hasChanged && (
        <div className="flex items-center justify-center h-10">
          <p
            className="text-sm text-blue-500 underline cursor-pointer"
            onClick={() => setOpen(true)}
          >
            프로필 수정하기
          </p>
        </div>
      )}

      <ActionConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        title="프로필 수정"
        content="사진을 수정하시겠어요?"
        processing={processing}
        onClickCheck={saveImage}
      />
    </>
  );
}
