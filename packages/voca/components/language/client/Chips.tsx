import { TypeGbn, Word, WordBase } from '@/config/defaultType';
import { Box, Chip } from '@mui/material';

interface Props {
  item: Word<WordBase> | undefined;
  onChangeItem: (key: string, data: any) => void;
}

const type = 'type';

const Chips = ({ item, onChangeItem }: Props) => {
  const ChipController = (value: TypeGbn) => {
    if (!value || !item) return false;
    return item.type === value ? true : false;
  };

  return (
    <Box sx={{ my: 2 }}>
      <Chip
        label="동사"
        color={ChipController('verb') ? 'info' : 'default'}
        sx={{ mr: 1 }}
        clickable
        onClick={() => onChangeItem(type, 'verb')}
      />
      <Chip
        label="명사"
        color={ChipController('noun') ? 'info' : 'default'}
        sx={{ mr: 1 }}
        clickable
        onClick={() => onChangeItem(type, 'noun')}
      />
      <Chip
        label="형용사"
        color={ChipController('adj') ? 'info' : 'default'}
        sx={{ mr: 1 }}
        clickable
        onClick={() => onChangeItem(type, 'adj')}
      />
      <Chip
        label="부사"
        color={ChipController('adv') ? 'info' : 'default'}
        sx={{ mr: 1 }}
        clickable
        onClick={() => onChangeItem(type, 'adv')}
      />
      <Chip
        label="기타"
        color={ChipController('etc') ? 'info' : 'default'}
        sx={{ mr: 1 }}
        clickable
        onClick={() => onChangeItem(type, 'etc')}
      />
    </Box>
  );
};

export default Chips;
