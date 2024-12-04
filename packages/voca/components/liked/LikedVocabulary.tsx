'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import db from '@/api/module';
import { Box, Skeleton, Typography } from '@mui/material';
import { useData } from '@/api/usequery.module';

export default function LikedVocabulary() {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [, , language] = path.split('/');

  // const sdf = useData('japanese', { page: 1, perPage: 10 }, () => {});

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

  if (loading) return <Skeleton sx={{ width: 40, height: 40 }} />;

  return (
    <Typography variant="caption" color="text.secondary">
      <Typography variant="subtitle2" color="error.main" component="span">
        {total}{' '}
      </Typography>
      개
    </Typography>
  );
}
