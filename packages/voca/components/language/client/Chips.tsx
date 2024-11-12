import { TypeGbn, Word, WordBase } from '@/config/defaultType';
import { Box, Chip } from '@mui/material';

interface Props {
  item: Word<WordBase> | undefined;
}

const Chips = ({ item }: Props) => {
  const ChipController = (value: TypeGbn) => {
    if (!value || !item) return false;
    return item.type === value ? true : false;
  };

  return (
    <Box sx={{ my: 1 }}>
      <Chip
        label="동사"
        color={ChipController('verb') ? 'info' : 'default'}
        sx={{ mr: 1 }}
      />
      <Chip
        label="명사"
        color={ChipController('noun') ? 'info' : 'default'}
        sx={{ mr: 1 }}
      />
      <Chip
        label="형용사"
        color={ChipController('adj') ? 'info' : 'default'}
        sx={{ mr: 1 }}
      />
      <Chip
        label="부사"
        color={ChipController('adv') ? 'info' : 'default'}
        sx={{ mr: 1 }}
      />
      <Chip
        label="기타"
        color={ChipController('etc') ? 'info' : 'default'}
        sx={{ mr: 1 }}
      />
    </Box>
  );
};

export default Chips;
