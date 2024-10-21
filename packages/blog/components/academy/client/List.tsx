'use client';
import db from '@/api/module';
import { Schema } from '@/config/schema';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchFilterAtom from './state';
import Title from './Title';
import ListImage from './ListImage';

interface Props {
  rows: any[];
  path: Schema;
}

const List = ({ ...props }: Props) => {
  const [rows, setRows] = useState(props?.rows || []);
  const filterState = useRecoilValue(SearchFilterAtom);

  const onLoadData = async () => {
    const { data = [] } = await db.search('library', {
      options: { ...filterState, 'theme.like': props?.path },
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
                    width: '70%', //"70%"
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

                <ListImage
                  collectionId={item?.collectionId}
                  recordId={item?.id}
                  imageName={item?.thumbnail}
                  path={props?.path}
                />
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
