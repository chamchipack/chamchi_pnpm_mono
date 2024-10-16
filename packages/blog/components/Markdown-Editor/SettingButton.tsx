import { Box, Button } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import { SetStateAction } from 'react';

interface Props {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingButton({ setPreview }: Props) {
  const isMobile = useClientSize('sm');

  return (
    <Box
      sx={{
        height: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        mt: 2,
      }}
    >
      {isMobile && (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            px: 1,
            py: 0.5,
            mr: 2,
            borderRadius: 1,
            background: (theme) => `${theme.palette.success.main}`,
            borderColor: 'success.main',
            color: 'background.paper',
            '&:hover': {
              borderColor: 'success.dark',
              background: (theme) => `${theme.palette.success.dark}`,
            },
          }}
          onClick={() => setPreview(true)}
        >
          미리보기
        </Button>
      )}

      <Button
        variant="outlined"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          mr: 2,
          borderRadius: 1,
          background: (theme) => `${theme.palette.warning.main}`,
          borderColor: 'warning.main',
          color: 'background.paper',
          '&:hover': {
            borderColor: 'warning.dark',
            background: (theme) => `${theme.palette.warning.dark}`,
          },
        }}
      >
        취소하기
      </Button>

      <Button
        variant="outlined"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          mr: 2,
          borderRadius: 1,
          background: (theme) => `${theme.palette.primary.main}`,
          borderColor: 'primary.main',
          color: 'background.paper',
          '&:hover': {
            borderColor: 'primary.dark',
            background: (theme) => `${theme.palette.primary.dark}`,
          },
        }}
      >
        글 저장하기
      </Button>
    </Box>
  );
}
