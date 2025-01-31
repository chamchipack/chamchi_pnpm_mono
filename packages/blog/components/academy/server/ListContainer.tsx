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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '100%', alignItems: 'center', margin: '0 auto' }}>
          <List rows={[]} path={path} total={0} />
        </Box>

        <Box
          sx={{
            flexBasis: { xs: '0%', sm: '50%' },
            display: { xs: 'none', sm: 'block' }, // flex → block 변경
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%', // 높이 보장
              p: 3,
              overflow: 'visible', // sticky 방해 요소 제거
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mr: 3, alignSelf: 'stretch', height: '100%' }}
            />

            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%', // 높이 추가
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  position: 'sticky',
                  top: '80px', // 필요에 따라 조정
                  zIndex: 10,
                  backgroundColor: 'white',
                  height: 'auto',
                }}
              >
                <SearchFilter />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <div className={styles['responsive-container']}>
      <div className={styles['reponsive-content']} style={{ width: '100%' }}>
      </div>

      <div className={styles['responsive-side']} style={{}}>
      </div>
    </div> */}
    </>
  );
}
