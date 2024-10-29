'use client';

import { Box, Chip, Divider, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchInput from '../language/SearchInput';
import { useState } from 'react';
import { hiragana, logic } from '@/config/default';

export default function Detail({ ...props }) {
  const [data, setData] = useState(props?.row);
  const [timeSelection, setTimeSelection] = useState('');

  const handleChipClick = (tense: string) => {
    setTimeSelection(tense);
  };

  const onConvertRow = () => {
    if (!timeSelection) return <></>;

    const _logic: any = logic.find(({ type = '' }) => type === timeSelection);

    const { etc: { form = 0, endingro = '', stemjp = '' } = {} } = data;

    const good = _logic['value'][form];
    const a = good[endingro];

    const romaji = _logic['value'][form][endingro].split('_');

    let result = '';
    romaji.map((o: string) => {
      Object.values(hiragana).forEach((data) => {
        const { jp = '' } = data.find(({ ro: _ro }) => _ro === o) || {};
        if (jp) result += jp;
      });
    });

    console.info(stemjp, result);

    return <Typography>{stemjp + result}</Typography>;
  };

  return (
    <>
      <SearchInput />
      <Box sx={{ p: 2 }}>
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
                  {data?.kana}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  {data?.ko}
                </Typography>
              </Box>
            </Box>
          </Box>

          <IconButton>
            <FavoriteIcon />
          </IconButton>
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

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" color="text.primary">
            변화형
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row' }}>
            <Chip
              label="현재형"
              clickable
              onClick={() => handleChipClick('present')}
              color={timeSelection === 'present' ? 'primary' : 'default'}
            />
            <Chip
              label="과거형"
              clickable
              onClick={() => handleChipClick('past')}
              color={timeSelection === 'past' ? 'primary' : 'default'}
            />
            <Chip
              label="미래형"
              clickable
              onClick={() => handleChipClick('future')}
              color={timeSelection === 'future' ? 'primary' : 'default'}
            />
          </Box>

          <Box>{onConvertRow()}</Box>
        </Box>
      </Box>
    </>
  );
}
