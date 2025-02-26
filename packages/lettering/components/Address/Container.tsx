import { Box, List } from '@mui/material';
import AddressSettingContainer from './setting/AddressSettingContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <AddressSettingContainer />
        </Box>
      </Box>
    </>
  );
}
