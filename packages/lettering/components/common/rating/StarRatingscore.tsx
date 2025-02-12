import { Box, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';

interface Props {
  iconSize?: number;
  rating?: number;
}

export default function StarRatingscore({ ...props }: Props) {
  const size = props?.iconSize || 18;
  return (
    <Box sx={{ display: ' flex', flexDirection: 'row', alignItems: 'center' }}>
      <StarRateIcon sx={{ color: 'common.star', width: size, height: size }} />
      <Typography fontSize={16} fontWeight={'bold'} sx={{ ml: 0.5 }}>
        {props?.rating || 4.7}
      </Typography>
    </Box>
  );
}
