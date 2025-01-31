'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ListImage from './container/ListImage';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

interface ContentProps {
  data: any[];
}

const CardComponent = ({ data }: ContentProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // 카드들을 세로로 정렬
        alignItems: 'center', // 가운데 정렬
        justifyContent: 'center', // 세로 중앙 정렬
        width: '100%',
        paddingX: '20px',
        margin: '0 auto',
        background: 'black', // 전체 컨테이너 배경색
        overflow: 'hidden',
      }}
    >
      {data && (
        <Typography
          variant="subtitle1"
          color="white"
          sx={{ marginBlock: { xs: 0, md: 5 } }}
        >
          최근 작성글
        </Typography>
      )}
      {data &&
        data.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }} // 추가
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                // justifyContent: 'center',
                maxWidth: '800px', // 카드 최대 너비 설정 (가운데 정렬 유지)
                width: '100%', // 반응형 적용
                minHeight: { xs: 300, md: 200 },
                margin: '0 auto', // 가운데 정렬 추가
                marginBottom: '30px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}
            >
              {/* 썸네일 박스 */}
              <Box sx={{ width: '100%', height: '100%' }}>
                <ListImage
                  collectionId={item?.collectionId}
                  recordId={item?.id}
                  imageName={item?.thumbnail}
                  index={index}
                />
              </Box>

              {/* 글귀 박스 */}
              <Box
                sx={{
                  '&:hover': { color: 'info.main' },
                  cursor: 'pointer',
                  width: '100%',
                  paddingTop: '10px',
                  textAlign: { xs: 'center', md: 'left' }, // 모바일: 중앙 정렬, 웹: 왼쪽 정렬
                  color: 'white',
                  marginLeft: { xs: 0, md: 10 },
                }}
                onClick={() => {
                  if (!item?.id) return;
                  router.push(`/pinetree/${item?.theme}/${item?.id}`);
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {item?.markdown_title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item?.summary}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
    </Box>
  );
};

export default CardComponent;
