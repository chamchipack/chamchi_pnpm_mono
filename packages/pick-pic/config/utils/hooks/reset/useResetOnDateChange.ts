import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export function useResetOnDateChange(resetOnce = true) {
  const globalDate = useRecoilValue(dateSelectionAtom);
  const resetDate = useResetRecoilState(dateSelectionAtom);
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!globalDate) return;
    if (resetOnce && didResetRef.current) return;

    resetDate();
    didResetRef.current = true;
  }, [globalDate]);
}
