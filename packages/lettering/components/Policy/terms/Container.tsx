'use client';

import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';
import { termsData } from '../content';

interface Props {
  type: string;
}

export default function TermsContainer({ type }: Props) {
  const router = useRouter();

  const handleRouter = (id: number) => {
    let path = `/application/policy/policy-detail`;

    const rs = JSON.stringify({ type, id });
    const isWebView = handleNavigation({
      path: 'policy/policy-detail',
      status: 'forward',
      params: rs,
    });

    if (!isWebView) return router.push(`${path}?type=${type}&id=${id}`);
  };

  return (
    <Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {termsData.map(({ id, title, date }) => (
          <ListItem
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // 왼쪽 제목, 오른쪽 아이콘 배치
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: 2, // 모서리 둥글게
              backgroundColor: '#e3e3e3', // ✅ 배경색 적용
              height: 80,
            }}
            onClick={() => handleRouter(id)}
          >
            {/* 왼쪽: 제목 + 날짜 */}
            <Box>
              <Typography fontSize={16} fontWeight={600}>
                {title}
              </Typography>
              <Typography fontSize={12} color="gray">
                {date}
              </Typography>
            </Box>

            {/* 오른쪽: 아이콘 (오른쪽 끝 정렬) */}
            <ArrowForwardIosIcon fontSize="small" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
