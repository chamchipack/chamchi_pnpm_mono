import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { getData } from '@/api/module/fetch';
import Content from '../client/Content'; // 분리된 Content 컴포넌트 import

export default async function ContentListContainer() {
  const parameter = {
    target: 'library',
    type: 'search',
    options: {},
    sort: {},
  };

  const result = await getData(parameter);
  const list: any[] = result?.data?.items || [];

  return (
    <Grid container spacing={2}>
      {list.length ? (
        <>
          {list.slice(0, 16).map((item, index) => (
            <Content key={item?.id} data={item} />
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
          <Typography color="text.secondary">조회된 글이 없어요!</Typography>
        </Box>
      )}
    </Grid>
  );
}
