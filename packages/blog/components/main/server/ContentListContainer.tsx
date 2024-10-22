import React from 'react';
import { Grid } from '@mui/material';
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
      {list.slice(0, 16).map((item, index) => (
        <Content key={item?.id} data={item} />
      ))}
    </Grid>
  );
}
