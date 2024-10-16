'use client';
import { Box, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { contents, isDetailPage } from '../state';
import { useRouter } from 'next/navigation';

const Title = ({ item }) => {
  const router = useRouter();
  const [, setDetailPage] = useRecoilState(isDetailPage);
  const [, setContents] = useRecoilState(contents);

  return (
    <Box>
      <Typography
        fontSize={18}
        fontWeight={500}
        sx={{
          '&:hover': { color: 'info.dark' },
          cursor: 'pointer',
        }}
        onClick={() => {
          setContents(item);
          // setDetailPage(true);

          if (!item?.id) return;
          router.push(`/pinetree/academy/${item?.id}`);
        }}
      >
        {item.markdown_title}
      </Typography>
    </Box>
  );
};

export default Title;
