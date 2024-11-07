'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import db from '@/api/module';
import { Box, Skeleton, Typography } from '@mui/material';

export default function LikedVocabulary() {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [, , language] = path.split('/');

  const onLoadLikedList = async () => {
    setLoading(true);
    const { data = [] } = await db.search('word_like', {
      options: { userId: session?.user?.id, 'language.like': language },
    });

    const count = data[0]?.wordIds.length ?? 0;
    setTotal(count);
    setLoading(false);
  };

  useEffect(() => {
    onLoadLikedList();
  }, []);

  if (loading) return <Skeleton sx={{ width: '100%', height: 40 }} />;

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        px: 1,
      }}
    >
      <Typography variant="subtitle1" color="text.primary">
        좋아요를 표시한 단어
      </Typography>

      <Typography variant="caption" color="text.secondary">
        <Typography variant="subtitle2" color="error.main" component="span">
          {total}{' '}
        </Typography>
        개
      </Typography>
    </Box>
  );
}
