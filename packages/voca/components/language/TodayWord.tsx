'use client';
import { Box, Typography } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';
import CommonTitle from '../word/CommonTitle';
import { useState } from 'react';
import { Language, Word, WordBase } from '@/config/defaultType';

interface Props {
  language: Language;
  row: Word<WordBase>;
}

export default function TodayWord({ ...props }: Props) {
  const [data, setData] = useState(props?.row);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 2,
        borderRadius: 4,
        mx: 1,
        p: 2,
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          p: 1,
          position: 'absolute',
          top: 8,
          left: 8,
        }}
      >
        <Typography sx={{ ...kboFont }} color="text.primary">
          오늘의 단어
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <CommonTitle
          title={data?.jp}
          color="text.secondary"
          variant="h4"
          language={props?.language}
          id={data?.id}
        />
        <Typography color="info.main" variant="caption">
          {data?.ko}
        </Typography>
      </Box>
    </Box>
  );
}
