import { s3ImageAtom } from '@/store/orderStore/s3image';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export function useResetS3Images(resetOnce = true) {
  const s3Images = useRecoilValue(s3ImageAtom);
  const resetImage = useResetRecoilState(s3ImageAtom);
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!s3Images || (Array.isArray(s3Images) && !s3Images.length)) return;
    if (resetOnce && didResetRef.current) return;

    resetImage();
    didResetRef.current = true;
  }, [s3Images]);
}
