import styles from './container.module.css';
import { ToastContainer } from 'react-toastify';

export default function BodyContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: '350px' }}
      />

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
