import { Box } from '@mui/material';
import ListButtonComponent from '../client/ListButtonComponent';
import List from './List';
import EditPageServerWrapper from '../EditPageServerWrapper';

export default function Container() {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  return (
    <>
      <EditPageServerWrapper>
        <Box
          sx={{
            width: '100%',
            height: 100,
            background: 'skyblue',
            borderRadius: 4,
            mt: 2,
          }}
        />

        <ListButtonComponent />

        <List />
      </EditPageServerWrapper>
    </>
  );
}
