import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditableAddressListProps {
  addressList: { id: string; name: string; address: string }[];
}

export default function EditableAddressList({
  addressList,
}: EditableAddressListProps) {
  return (
    <List>
      {addressList.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ✅ 좌측: 주소 정보 + 수정 버튼 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <ListItemText primary={item.name} secondary={item.address} />
            <Typography sx={{ fontSize: 10 }}>수정하기</Typography>
          </Box>

          {/* ✅ 우측: 삭제(휴지통) 버튼 */}
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
