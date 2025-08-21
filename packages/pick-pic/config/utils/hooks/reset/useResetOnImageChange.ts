import { imageObjectsAtom } from '@/store/orderStore/imagesAtom';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export function useResetOnImageChange(resetOnce = true) {
  const image64 = useRecoilValue(imageObjectsAtom);
  const resetImage = useResetRecoilState(imageObjectsAtom);
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!Object.entries(image64 || {}).length) return;
    if (resetOnce && didResetRef.current) return;

    resetImage();
    didResetRef.current = true;
  }, [image64]);
}
