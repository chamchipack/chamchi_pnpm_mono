export const dynamic = 'force-dynamic';

import { getData } from '@/api/module/fetch';
import { Box, Divider, Typography } from '@mui/material';
import styles from '../academy.module.css';
import List from '../client/List';
import SearchFilter from '../client/SearchFilter';

export default async function ListContainer({
  path,
}: {
  path: string;
}): Promise<React.ReactElement> {
  // const parameter = {
  //   target: 'library',
  //   type: 'search',
  //   options: { 'theme.like': path },
  //   sort: {},
  // };
  // const result = await getData(parameter);
  // const list: any[] = result?.data?.items || [];
  // const total = result?.data?.totalItems || 0;

  return (
    <div className={styles['responsive-container']}>
      <div className={styles['reponsive-content']} style={{ width: '100%' }}>
        {/* {list.length ? ( */}
        <List rows={[]} path={path} total={0} />
        {/* ) : (
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
        )} */}
      </div>

      {/* 웹 사이즈일때 출력되는 필터 */}
      <div className={styles['responsive-side']} style={{}}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Divider orientation="vertical" flexItem sx={{ mr: 3 }} />
          <Box>
            <SearchFilter />
          </Box>
        </Box>
      </div>
    </div>
  );
}
