'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  onClickCheck: (any: any) => void;
  title: string;
  content: string;
  children?: React.ReactNode;
  processing: boolean;
  isAlertModal?: boolean;
}

const ActionConfirmationModal = ({
  open,
  handleClose,
  onClickCheck,
  title,
  content,
  children,
  processing,
  isAlertModal = false,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-[90%] max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-4 mb-4 overflow-auto"
            style={{ maxHeight: '80vh' }}
          >
            <div className="mb-2 text-md font-bold text-black dark:text-white">
              {processing ? '처리 진행중' : title}
            </div>

            <div className="mb-6 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {processing
                ? '잠시만 기다려주세요! 곧 완료됩니다.'
                : content || ''}
            </div>

            <div>{children}</div>

            <div className="flex-col mt-4 space-x-3">
              {isAlertModal ? (
                <button
                  onClick={handleClose}
                  disabled={processing}
                  className={`w-[100%] h-11 text-white font-bold rounded-4xl text-sm my-1 ${
                    processing ? 'cursor-not-allowed' : 'bg-main hover:bg-main'
                  }`}
                >
                  확인
                </button>
              ) : (
                <>
                  <button
                    onClick={onClickCheck}
                    disabled={processing}
                    className={`w-[100%] h-11 text-white font-bold rounded-xl text-sm my-1 ${
                      processing
                        ? 'cursor-not-allowed'
                        : 'bg-main hover:bg-main'
                    }`}
                  >
                    확인
                  </button>
                  <button
                    onClick={handleClose}
                    disabled={processing}
                    className={`w-[100%] h-11 text-main font-bold rounded-md text-sm mt-4 ${
                      processing ? 'text-gray-500 cursor-not-allowed' : ''
                    }`}
                  >
                    취소
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ActionConfirmationModal);
