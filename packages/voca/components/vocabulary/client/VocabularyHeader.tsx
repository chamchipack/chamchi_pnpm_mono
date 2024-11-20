import { Box, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { kboFont } from 'package/styles/fonts/module';

interface VocabularyHeaderProps {
  name: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onClickReset: () => void;
  onDeleteVocabulary: () => void;
  onLoadVocaList: (value: number) => void;
  editmode: boolean;
}

const VocabularyHeader = ({
  name,
  setTitle,
  onClickReset,
  onDeleteVocabulary,
  onLoadVocaList,
  editmode,
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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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

        {!editmode ? (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ ...kboFont, ml: 1, alignSelf: 'center' }}
          >
            {name}
          </Typography>
        ) : (
          <TextField
            defaultValue={name}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            fullWidth
            sx={{
              '& .MuiInput-underline:before': {
                borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`, // 원하는 보더 색상
              },
              '& .MuiInput-underline:hover:before': {
                borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`, // 원하는 보더 색상
              },
              '& .MuiInput-underline:after': {
                borderBottom: (theme) => `1px solid ${theme.palette.grey[500]}`, // 원하는 보더 색상
              },
              '& .MuiInputBase-root': {
                border: 'none', // 상단, 좌측, 우측 보더 제거
              },
            }}
          />
        )}
      </Box>

      <IconButton onClick={onDeleteVocabulary}>
        <DeleteForeverIcon color="error" />
      </IconButton>
    </Box>
  );
};

export default VocabularyHeader;
