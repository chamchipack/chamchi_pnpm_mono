export const dynamic = 'force-dynamic';

import { Box, Divider, Typography } from '@mui/material';
// import styles from '../academy.module.css';
import List from '../client/List';
import SearchFilter from '../client/SearchFilter';

export default async function ListContainer({
  path,
}: {
  path: string;
}): Promise<React.ReactElement> {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '100%', alignItems: 'center', margin: '0 auto' }}>
          <List rows={[]} path={path} total={0} />
        </Box>

        <Box
          sx={{
            flexBasis: { xs: '0%', sm: '50%' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              p: 3,
              overflow: 'visible',
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
                height: '100%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  position: 'sticky',
                  top: '80px',
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
    </>
  );
}
