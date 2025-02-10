import React from 'react';
import LayoutContainer from './LayoutContainer';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
};

export default Layout;
