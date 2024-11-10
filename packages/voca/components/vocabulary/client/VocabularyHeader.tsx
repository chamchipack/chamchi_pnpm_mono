import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { kboFont } from 'package/styles/fonts/module';

interface VocabularyHeaderProps {
  name: string;
  onClickReset: () => void;
  onDeleteVocabulary: () => void;
  onLoadVocaList: (value: number) => void;
}

const VocabularyHeader = ({
  name,
  onClickReset,
  onDeleteVocabulary,
  onLoadVocaList,
}: VocabularyHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          aria-label="search"
          onClick={() => {
            onLoadVocaList(1);
            onClickReset();
          }}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
          sx={{ alignSelf: 'center' }}
        >
          <ArrowBackIosNewIcon sx={{ color: 'text.primary' }} />
        </IconButton>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ ...kboFont, ml: 1, alignSelf: 'center' }}
        >
          {name}
        </Typography>
      </Box>

      <IconButton onClick={onDeleteVocabulary}>
        <DeleteForeverIcon color="error" />
      </IconButton>
    </Box>
  );
};

export default VocabularyHeader;
