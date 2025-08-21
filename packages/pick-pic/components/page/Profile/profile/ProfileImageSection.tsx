'use client';

import { updateProfileImage } from '@/api/client/user';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { ResponseStatus } from '@/types/enums/enums';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DEFAULT_IMAGE = '/user.png';

interface Props {
  profile: string;
  userId: string;
}

const ProfileImageSection = ({ profile, userId }: Props) => {
  const router = useRouter();
  const alert = useAlert();

  const initialImage = profile || DEFAULT_IMAGE;

  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setImageError(false);
    setSelectedImage(initialImage);
  }, [initialImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageError(false);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleDelete = () => {
    setImageError(false);
    setSelectedImage(DEFAULT_IMAGE);
  };

  const isValidImage = selectedImage && !imageError;
  const hasChanged = selectedImage !== initialImage;

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
};

export default React.memo(ProfileImageSection);
