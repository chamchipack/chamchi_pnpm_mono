'use client';
import { Box, Button, Typography } from '@mui/material';
import Title from './Title';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchFilterAtom from './state';
import db from '@/api/module';
import { Schema } from '@/config/schema';

interface Props {
  rows: any[];
  path: Schema;
}

const List = ({ ...props }: Props) => {
  console.info(props?.rows);
  const [rows, setRows] = useState(props?.rows || []);
  const filterState = useRecoilValue(SearchFilterAtom);

  const onLoadData = async () => {
    const { data = [] } = await db.search(props?.path, {
      options: { ...filterState },
    });

    setRows(data);
  };

  useEffect(() => {
    if (Object.entries(filterState).length) {
      onLoadData();
    }
  }, [filterState]);

  return (
    <>
      {rows.length ? (
        <>
          {rows.map((item, index) => (
            <Box sx={{ width: '100%', minHeight: 140, mt: 4 }} key={index}>
              <Box
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'flex-start',
                  height: '140px',
                }}
              >
                <Box
                  sx={{
                    width: '70%',
                    pr: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Title item={item} path={props?.path} />

                  <Box sx={{ mt: 1, flexGrow: 1, width: '100%' }}>
                    <Typography
                      fontSize={12}
                      color="text.secondary"
                      lineHeight={1.3}
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {item.summary}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontSize={12} color="text.secondary">
                      날짜: {item.timestamp}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: '30%', maxWidth: 200, height: '100%' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: '#e2e2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      borderRadius: 3,
                    }}
                  >
                    <Typography fontSize={12} color="text.primary">
                      저장된 이미지가 <br />
                      없습니다
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 50,
            background: '#e2e2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 4,
            borderRadius: 3,
          }}
        >
          <Typography color="text.secondary">
            조회된 데이터가 없어요!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default List;
