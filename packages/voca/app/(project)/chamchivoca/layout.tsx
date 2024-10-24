import HeaderContainer from '@/components/layout/Header/HeaderContainer';
import React from 'react';
import styles from './layout.module.css';
import FooterContainer from '@/components/layout/Footer/FooterContainer';
import ServerClientAdapter from './ServerClientAdapter';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ServerClientAdapter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div className={styles['responsive-container']}>
          <HeaderContainer />
        </div>
        <div
          className={styles['responsive-container']}
          style={{ height: '100%' }}
        >
          {children}
        </div>
        <FooterContainer />
      </div>
    </ServerClientAdapter>
  );
};

export default Layout;
