'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollModal = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // 3초 후 자동으로 모달 닫기
    const timer = setTimeout(() => setShowModal(false), 3000);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          onClick={() => setShowModal(false)} // 클릭하면 즉시 닫힘
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px 30px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">
              아래로 스크롤 해보세요 ⬇️
            </Typography>
            <Typography variant="body2" color="text.secondary">
              스크롤을 내려서 더 많은 내용을 확인하세요.
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollModal;
