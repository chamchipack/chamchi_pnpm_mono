import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import SettingBox from './SettingBox';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={true} title="나의 설정" />
        </Box>

        <Box sx={{ px: 2, mt: 2 }}>
          <SettingBox />
        </Box>
      </Box>
    </>
  );
}
