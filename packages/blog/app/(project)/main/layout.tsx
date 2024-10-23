import React from 'react';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // 화면 전체 높이를 차지하도록 설정
      }}
    >
      {/* Body content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Footer */}
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
