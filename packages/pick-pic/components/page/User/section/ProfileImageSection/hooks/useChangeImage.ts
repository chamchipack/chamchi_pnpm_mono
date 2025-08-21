'use client';

import { useEffect, useState } from 'react';

const DEFAULT_IMAGE = '/user.png';

export default function useChangeImage(
  profile: string,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
) {
  const [imageError, setImageError] = useState(false);

  const initialImage = profile || DEFAULT_IMAGE;
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  const isValidImage = selectedImage && !imageError;
  const hasChanged = selectedImage !== initialImage;

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

  return {
    isValidImage,
    selectedImage,
    setImageError,
    handleImageChange,
    hasChanged,
  };
}
