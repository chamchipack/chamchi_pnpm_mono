'use client';

import { Box, Divider, IconButton, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import { useState } from 'react';
import { verbLogic } from '@/config/logic';
import VerbFormTransformer from './verb/VerbFormTransformer';
import { useSession } from 'next-auth/react';
import LikeButton from './common/LikeButton';
import { Verb, Word, WordBase, typeGbn } from '@/config/defaultType';

export default function Detail({ ...props }) {
  const { data: session } = useSession();
  const [data, setData] = useState<Word<WordBase>>(props?.row);

  const verbGroupNamed = (data: Word<WordBase>) => {
    if (data.type === 'verb' && data.etc && 'form' in data.etc) {
      const value: number = (data.etc as Verb).form!;
      return `${value}그룹`;
    } else {
      return '';
    }
  };

  return (
    <>
      <SearchInput language={props?.language} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {typeGbn[data?.type]} {verbGroupNamed(data)}
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

        {data?.example ? (
          <>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" color="text.primary">
                예문
              </Typography>
              <>
                {data?.example.map((example, index) => (
                  <Box sx={{ mt: 3 }} key={index}>
                    <Typography color="text.primary">{example.jp}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {example.ko}
                    </Typography>
                  </Box>
                ))}
              </>
            </Box>

            <Divider sx={{ my: 3 }} />
          </>
        ) : null}

        {data?.type === 'verb' ? <VerbFormTransformer data={data} /> : null}
      </Box>
    </>
  );
}
