import { Box, Typography } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';
import moment from 'moment';

const Test = () => {
  return (
    <Box>
      <Typography sx={{ ...kboFont }}>
        {moment().format('YYYY-MM-DD')}
      </Typography>
    </Box>
  );
};

export default Test;
