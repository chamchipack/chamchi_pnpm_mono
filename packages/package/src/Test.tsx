import { Box, Typography } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';
const Test = () => {
  return (
    <Box>
      <Typography sx={{ ...kboFont }}>안녕하세요</Typography>
    </Box>
  );
};

export default Test;
