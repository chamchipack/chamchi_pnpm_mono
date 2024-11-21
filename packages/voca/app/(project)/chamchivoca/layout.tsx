import HeaderContainer from '@/components/layout/Header/HeaderContainer';
import React, { useMemo } from 'react';
import styles from './layout.module.css';
import FooterContainer from '@/components/layout/Footer/FooterContainer';
import ServerClientAdapter from './ServerClientAdapter';
import { pretendardFont } from 'package/styles/fonts/module';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // useMemo를 사용하여 children을 메모이제이션
  const memoizedChildren = useMemo(() => {
    return <>{children}</>;
  }, [children]);

  return (
    <>
      <ServerClientAdapter>
        <div
          style={{
            ...pretendardFont,
            display: 'flex',
            flexDirection: 'column',
            // background: 'red',
            // height: '100vh',
            // height: 'calc(var(--vh, 1vh) * 110)',
            // background: 'red',
          }}
        >
          <div className={styles['responsive-container']}>
            <HeaderContainer />
          </div>
          <div
            className={styles['responsive-container']}
            style={{ height: '100%' }}
          >
            {memoizedChildren}
          </div>
        </div>
        <FooterContainer />
      </ServerClientAdapter>
    </>
  );
};

export default Layout;
