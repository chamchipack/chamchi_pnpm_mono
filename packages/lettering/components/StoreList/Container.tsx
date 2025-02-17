'use client';
import { Box } from '@mui/material';
import InputContainer from '../Search/search/InputContainer';
import ListContainer from './list/ListContainer';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import { Dayjs } from 'dayjs';

interface Props {
  params: {
    query: string;
    date: Dayjs | null;
  };
}

export default function Container({ params }: Props) {
  const size = useClientSize('sm');
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <InputContainer
            isFilterVisable={true}
            isBackwardVisable={true}
            isTimeSelectable={true}
            params={params}
          />
        </Box>
        <Box sx={{ pr: size ? 0 : 2.5, pl: 2.5, my: 4 }}>
          <ListContainer />
        </Box>
      </Box>
    </>
  );
}
