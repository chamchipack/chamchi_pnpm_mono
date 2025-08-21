'use client';

import HeadComponent from '@/components/common/HeadComponent';
import useHandleRouter from './hooks/useHandleRouter';

export default function HeaderSection() {
  const { handleRouter } = useHandleRouter();

  return (
    <HeadComponent
      isLeftButtonVisable={false}
      title="마이 페이지"
      isRightButtonVisable
      onRightButtonClick={handleRouter}
    />
  );
}
