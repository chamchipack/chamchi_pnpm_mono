import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AddressListProps {
  addressList: { id: string; name: string; address: string }[];
  selectedAddress: string | null;
  setSelectedAddress: (id: string) => void;
}

export default function AddressList({
  addressList,
  selectedAddress,
  setSelectedAddress,
}: AddressListProps) {
  return (
    <List>
      {addressList.map((item) => (
        <ListItem
          key={item.id}
          button
          onClick={() => setSelectedAddress(item.id)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <RoomIcon color="action" />
          </ListItemIcon>
          <ListItemText primary={item.name} secondary={item.address} />
          {selectedAddress === item.id && <CheckCircleIcon />}
        </ListItem>
      ))}
    </List>
  );
}
