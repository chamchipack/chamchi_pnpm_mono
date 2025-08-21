// hooks/usePageHistory.ts
'use client';

import { pageHistoryAtom } from '@/store/routeStore/state';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

/**
 * currentPath만 넘기면 자동으로 prev, current를 업데이트하는 훅
 */
export default function usePageHistory(currentPath: string | null) {
  const setHistory = useSetRecoilState(pageHistoryAtom);

  useEffect(() => {
    if (!currentPath) return;
    setHistory((prev) => ({
      prev: prev.current === currentPath ? '' : prev.current,
      current: currentPath,
    }));
  }, [currentPath]);
}
