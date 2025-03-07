import { Box } from '@mui/material';
import InputContainer from '../Search/search/InputContainer';
import ListContainer from './list/ListContainer';
import { Dayjs } from 'dayjs';
import CurrentLocationTypo from '../common/location/CurrentLocationTypo';

interface Props {
  params: {
    query: string;
    date: Dayjs | null;
  };
}

export default function Container({ params }: Props) {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <InputContainer
            isFilterVisable={true}
            isBackwardVisable={true}
            isTimeSelectable={true}
            params={params}
            isClickAllowed={false}
          />
          <CurrentLocationTypo isClickAvailable />
        </Box>
        <Box sx={{ pr: 0, pl: 2.5, my: 4 }}>
          <ListContainer />
        </Box>
      </Box>
    </>
  );
}
