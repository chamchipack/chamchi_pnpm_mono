import { Box, Divider, Typography } from '@mui/material';
import styles from '../academy.module.css';
import { getData } from '@/api/module/fetch';
import List from '../client/List';
import SearchFilter from '../client/SearchFilter';
import { Schema } from '@/config/schema';

export default async function ListContainer({ path }: { path: Schema }) {
  const params = { target: path, type: 'search', options: {}, sort: {} };
  const result = await getData(params);
  const list: any[] = result?.data?.items || [];

  return (
    <div className={styles['responsive-container']}>
      <div className={styles['reponsive-content']} style={{ width: '100%' }}>
        {list.length ? (
          <List rows={list} path={path} />
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
      </div>

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
