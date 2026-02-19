'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  MousePointer2,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
// import AlertLoginCallback from './AlertLoginCallback';
import { alertModalAtom } from '@/lib/store/alert/alert-state';

export default function AlertModal() {
  const router = useRouter();
  const pathname = usePathname();
  const [alert, setAlert] = useRecoilState(alertModalAtom);
  const [open, setOpen] = useState(false);

  const position: 'top' | 'center' | 'bottom' = alert.position ?? 'top';

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
    alert.onClose?.();
  };

  const getColor = () => {
    switch (alert.type) {
      case 'success':
        return '#16a34a';
      case 'error':
        return '#dc2626';
      case 'warning':
        return '#f59e0b';
      case 'auth':
        return '#0ea5e9';
      default:
        return '#3b82f6';
    }
  };

  const getIcon = () => {
    const color = getColor();
    const props = { size: 20, color };
    switch (alert.type) {
      case 'success':
        return <CheckCircle {...props} />;
      case 'error':
        return <XCircle {...props} />;
      case 'warning':
        return <AlertTriangle {...props} />;
      case 'auth':
        return <ShieldCheck {...props} />;
      default:
        return <Info {...props} />;
    }
  };

  useEffect(() => {
    if (!alert.open) return;
    const timeout = setTimeout(() => {
      handleClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert.open]);

  const handleRouter = () => {
    handleClose();
    setOpen(true);
    localStorage.setItem('redirectAfterLogin', pathname);

    // const path = `/login`;
    // const isWebView = handleNavigation({ path: 'login', status: 'replace' });
    // if (!isWebView) router.replace(path);
    // router.replace(path);
  };

  const variants = {
    top: {
      initial: { y: '-100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100%', opacity: 0 },
    },
    bottom: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
    },
    center: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const positionStyles: Record<string, React.CSSProperties> = {
    top: {
      position: 'fixed',
      top: 20,
      left: 0,
      right: 0,
      margin: '0 auto',
      width: '90%',
      maxWidth: '420px',
    },
    center: {},
    bottom: {
      position: 'fixed',
      bottom: 20,
      left: 0,
      right: 0,
      margin: '0 auto',
      width: '90%',
      maxWidth: '420px',
    },
  };

  return (
    <>
      <AnimatePresence>
        {alert.open && (
          <motion.div
            variants={variants[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className={`fixed ${
              position === 'top'
                ? 'top-5'
                : position === 'bottom'
                  ? 'bottom-5'
                  : 'top-1/2 -translate-y-1/2'
            } left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black rounded-full z-50 shadow-lg z-[9999]`}
          >
            <div className="px-4 py-2">
              {alert.type !== 'auth' ? (
                <div className="flex items-center gap-2">
                  {getIcon()}
                  <p className="flex-1 ml-2 text-sm font-normal text-white whitespace-pre-line">
                    {alert.message}
                  </p>
                  <button onClick={handleClose} className="text-white">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {getIcon()}
                  <p className="flex-1 ml-2 text-sm font-medium text-white whitespace-pre-line">
                    로그인이 필요합니다!
                  </p>
                  <button
                    onClick={handleRouter}
                    className="flex items-center text-white gap-1"
                  >
                    <span className="text-sm font-medium">로그인 하러가기</span>
                    <MousePointer2
                      style={{ color: '#FEE500', width: 18, height: 18 }}
                    />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <AlertLoginCallback open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
}
