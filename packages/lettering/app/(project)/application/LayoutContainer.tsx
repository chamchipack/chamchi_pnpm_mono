import NavigationBar from '@/components/common/Layout/NavigationBar';
import styles from './container.module.css';

export default function LayoutContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div
        className={styles['responsive-container']}
        style={{
          margin: '0 auto',
          minWidth: '350px',
          // minHeight: '100vh',
        }}
      >
        {children}
        {/* <NavigationBar /> */}
      </div>
    </>
  );
}
