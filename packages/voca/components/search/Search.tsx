'use client';

import { Box, Divider, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import CommonTitle from '../word/CommonTitle';
import { motion } from 'framer-motion';
import { Language, Word, WordBase } from '@/config/defaultType';

interface Props {
  language: Language;
  rows: Word<WordBase>[];
}

export default function Search({ ...props }: Props) {
  return (
    <>
      <SearchInput language={props?.language} />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          검색결과
        </Typography>
      </Box>

      {/* <Box
        sx={{
          width: '100%',
          height: 50,
          background: '#e2e2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2,
          borderRadius: 3,
        }}
      >
        <Typography color="text.secondary">조회된 데이터가 없어요!</Typography>
      </Box> */}

      <Box>
        {props?.rows.map((item: any) => (
          <Box
            component={motion.div}
            whileHover={{ y: -2 }}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              p: 2,
              mb: 2,
            }}
          >
            <Box sx={{ minWidth: 100 }}>
              <CommonTitle
                title={item?.jp}
                color="text.primary"
                variant="h3"
                language={props?.language}
                id={item?.id}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography variant="caption" color="info.main">
                  {item?.kana}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  {item?.ko}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />
      </Box>
    </>
  );
}
