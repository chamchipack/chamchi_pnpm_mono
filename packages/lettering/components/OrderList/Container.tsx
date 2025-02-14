import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import InputContainer from '../Search/search/InputContainer';
import ListContainer from './list/ListContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2.5 }}>
          <HeadComponent isButtonVisable={false} title="주문내역" />
        </Box>

        <Box sx={{ px: 2 }}>
          <InputContainer
            isFilterVisable={false}
            isBackwardVisable={false}
            isTimeSelectable={false}
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <ListContainer />
        </Box>
      </Box>
    </>
  );
}
