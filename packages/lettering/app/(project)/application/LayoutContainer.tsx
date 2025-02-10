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
          minHeight: '100vh',
          minWidth: '350px',
        }}
      >
        {children}
      </div>
    </>
  );
}
