import HeaderContainer from '@/components/layout/Header/HeaderContainer';
import React, { useMemo } from 'react';
import styles from './layout.module.css';
import FooterContainer from '@/components/layout/Footer/FooterContainer';
import ServerClientAdapter from './ServerClientAdapter';

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
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',
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
          <FooterContainer />
        </div>
      </ServerClientAdapter>
    </>
  );
};

export default Layout;
