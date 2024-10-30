'use client';

import { Box, Chip, Divider, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchInput from '../language/SearchInput';
import { useState } from 'react';
import { hiragana, typeGbn, Verb, Word } from '@/config/default';
import { logic, verbLogic } from '@/config/logic';
import CloseIcon from '@mui/icons-material/Close';

export default function Detail({ ...props }) {
  const [data, setData] = useState<Word<Verb>>(props?.row);
  const [formSelection, setFormSelection] = useState('');
  const [formArray, setFormArray] = useState([]);
  const [detailSelection, setDetailSelection] = useState<any[]>([]); // 다중 선택을 위한 배열

  const handleChipClick = (tense: string) => {
    if (tense === formSelection) {
      setDetailSelection([]);
      setFormArray([]);
      setFormSelection('');
      return;
    }

    setDetailSelection([]);
    setFormSelection(tense);
    const { value = [] } =
      verbLogic.find(({ key = '' }) => key === tense) || {};
    setFormArray(value);
  };

  const handleDetailClick = (name: string, value: any) => {
    setDetailSelection((prev) => {
      const exists = prev.some((item) => item.name === name);

      if (exists) {
        return prev.filter((item) => item.name !== name);
      } else {
        return [...prev, { name, value }];
      }
    });
  };

  const onConvertRow = (name: string, value: any) => {
    const { ko = '', etc: { form = 0, endingro = '', stemjp = '' } = {} } =
      data;

    const good = value[form];
    const romaji = good[endingro].split('_');

    let result = '';
    romaji.map((o: string) => {
      Object.values(hiragana).forEach((data) => {
        const { jp = '' } = data.find(({ ro: _ro }) => _ro === o) || {};
        if (jp) result += jp;
      });
    });

    return (
      <>
        <Box
          sx={{
            p: 1,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mt: 2,
            borderRadius: 3,
            alignItems: 'center',
          }}
        >
          <Typography
            component="span"
            color="info.main"
            variant="caption"
            sx={{ minWidth: 100 }}
          >
            {`${ko} + ${name}`}
          </Typography>
          <Typography component="span" color="text.primary" sx={{ mx: 3 }}>
            {stemjp}
            <Typography component="span" color="error.main">
              {result}
            </Typography>
          </Typography>
        </Box>
        {/* <Divider /> */}
      </>
    );
  };

  return (
    <>
      <SearchInput />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {typeGbn[data?.type]}
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

        {data?.type === 'verb' ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="text.primary">
              변화형
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {verbLogic.map(({ name = '', key = '' }) => (
                <Chip
                  label={name}
                  clickable
                  onClick={() => handleChipClick(key)}
                  color={formSelection === key ? 'warning' : 'default'}
                  sx={{ mr: 0.5, mb: 0.5 }} // 아래 간격도 추가해줘서 칩들이 다음 줄로 넘어갈 때 간격 확보
                />
              ))}
              {formSelection && (
                <IconButton
                  onClick={() => {
                    setFormSelection('');
                    setDetailSelection([]);
                    setFormArray([]);
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {formArray.map(({ name = '', key = '', value }) => (
                <Chip
                  label={name}
                  clickable
                  onClick={() => handleDetailClick(name, value)}
                  color={
                    detailSelection.map(({ name }) => name).includes(name)
                      ? 'primary'
                      : 'default'
                  }
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
              {formArray.length ? (
                <IconButton
                  onClick={() => {
                    setDetailSelection([]);
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              ) : null}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                zIndex: 0,
              }}
            >
              {detailSelection && (
                <Box sx={{ width: '100%' }}>
                  {detailSelection.map((item) => (
                    <>
                      <Box>{onConvertRow(item?.name, item?.value)}</Box>
                    </>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
