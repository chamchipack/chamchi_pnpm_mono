import styles from './container.module.css';

export default function BodyContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div
        className={styles['responsive-container']}
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '4rem',
          overflowY: 'hidden',
          minHeight: '90vh',
        }}
      >
        {children}
      </div>
    </>
  );
}
