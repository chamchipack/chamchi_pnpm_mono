import React from 'react';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>{children}</div>
  );
};

export default Layout;
