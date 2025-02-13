import { Typography } from '@mui/material';

interface Props {
  count: number;
}

export default function ReviewCount({ count = 0 }: Props) {
  return (
    <Typography fontSize={14}>
      리뷰{' '}
      <Typography component={'span'} fontSize={14} fontWeight={'bold'}>
        {count}{' '}
      </Typography>
      개
    </Typography>
  );
}
