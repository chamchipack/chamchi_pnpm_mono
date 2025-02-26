import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmptyBox from '@/components/common/overlay/EmptyBox';

type AddressListType = {
  address: string;
  longitude: string;
  latitude: string;
};

interface AddressListProps {
  addressList: AddressListType[];
  selectedAddress: string | null;
  setSelectedAddress: (id: string) => void;
  onSelectAddress: (item: AddressListType) => void;
  loading: boolean;
}

export default function AddressList({
  addressList = [],
  selectedAddress,
  setSelectedAddress,
  onSelectAddress,
  loading = false,
}: AddressListProps) {
  if (!addressList.length)
    return <EmptyBox title={'현재 주소가 지정되어 있지않아요'} />;

  return (
    <List>
      {addressList.map((item) => (
        <ListItem
          key={item.address}
          button
          onClick={() => {
            if (loading) return;
            onSelectAddress(item);
          }}
          sx={{ my: 1 }}
        >
          <ListItemIcon>
            {item.address && <RoomIcon color="action" />}
          </ListItemIcon>
          <ListItemText
            primary={item.address}
            secondary={selectedAddress === item.address ? '현재 내 위치' : ''}
          />
          {selectedAddress === item.address && <CheckCircleIcon />}
        </ListItem>
      ))}
    </List>
  );
}
