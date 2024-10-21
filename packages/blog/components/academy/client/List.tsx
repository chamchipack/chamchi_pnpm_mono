'use client';
import db from '@/api/module';
import { Schema } from '@/config/schema';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaginationAtom, SearchFilterAtom } from './state';
import Title from './Title';
import ListImage from './ListImage';
import PaginationComponent from './Pagination';

interface Props {
  rows: any[];
  path: Schema;
  total: number;
}

const List = ({ ...props }: Props) => {
  const [rows, setRows] = useState(props?.rows || []);
  const [total, setTotal] = useState(props?.total);
  const filterState = useRecoilValue(SearchFilterAtom);
  const paginationState = useRecoilValue(PaginationAtom);

  const onLoadData = async () => {
    const { data = [] } = await db.search('library', {
      options: { ...filterState, 'theme.like': props?.path },
      pagination: { ...paginationState },
    });
    setTotal(data?.totalItems);
    const result = Array.isArray(data) ? data : data?.items;

    setRows(result);
  };

  useEffect(() => {
    if (
      Object.entries(filterState).length ||
      Object.entries(paginationState).length
    ) {
      onLoadData();
    }
    console.info(rows);
  }, [filterState, paginationState]);

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
                      작성자: {item?.userName}
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
          <PaginationComponent total={total} />
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
