'use client';

import { Box, Divider, IconButton, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import { useState } from 'react';
import { hiragana, typeGbn, Verb, Word } from '@/config/default';
import { verbLogic } from '@/config/logic';
import VerbFormTransformer from './verb/VerbFormTransformer';
import { useSession } from 'next-auth/react';
import LikeButton from './common/LikeButton';

export default function Detail({ ...props }) {
  const { data: session } = useSession();
  const [data, setData] = useState<Word<Verb>>(props?.row);

  const verbGroupNamed = (value: number) => {
    if (value) return `${value}그룹`;
    else return '';
  };

  return (
    <>
      <SearchInput language={props?.language} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {typeGbn[data?.type]} {verbGroupNamed(data?.etc?.form as number)}
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Box sx={{ minWidth: 100 }}>
              <Typography variant="h3" color="text.primary">
                {data?.jp}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography variant="caption" color="info.main">
                  {data?.kana} {data?.ro}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  {data?.ko}
                </Typography>
              </Box>
            </Box>
          </Box>

          {session && <LikeButton wordId={data?.id} />}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" color="text.primary">
            예문
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography color="text.primary">友達ともだちに会あう</Typography>
            <Typography variant="caption" color="text.secondary">
              친구와 만나다
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography color="text.primary">友達ともだちに会あう</Typography>
            <Typography variant="caption" color="text.secondary">
              친구와 만나다
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {data?.type === 'verb' ? <VerbFormTransformer data={data} /> : null}
      </Box>
    </>
  );
}
