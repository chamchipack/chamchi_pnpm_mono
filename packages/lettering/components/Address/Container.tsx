import { Box, List } from '@mui/material';
import HeadComponent from './HeadComponent';
import ListContainer from './ListContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <ListContainer />
        </Box>
      </Box>
    </>
  );
}
