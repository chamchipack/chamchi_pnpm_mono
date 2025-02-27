import NavigationBar from '@/components/common/Layout/NavigationBar';
import styles from './container.module.css';

export default function LayoutContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles['layout-wrapper']}>
      {/* 좌측 빈 공간 (배경: 빨강) */}
      <div className={styles['side-space']} />

      {/* 중앙 컨텐츠 영역 (고정된 크기) */}
      <div className={styles['responsive-container']}>
        {children}

        {/* ✅ 웹 환경에서만 보이도록 설정 */}
        <NavigationBar />
      </div>

      {/* 우측 빈 공간 (배경: 빨강) */}
      <div className={styles['side-space']} />
    </div>
  );
}
