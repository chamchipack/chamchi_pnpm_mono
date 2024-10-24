import React from 'react';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div>헤더부분</div>
      <div style={{ flex: 1, height: '100%', width: '100%' }}>{children}</div>

      <footer
        style={{
          backgroundColor: '#f1f1f1',
          padding: '10px 20px',
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        <p>고정된 푸터 - 여기에 내용을 추가하세요</p>
      </footer>
    </div>
  );
};

export default Layout;
