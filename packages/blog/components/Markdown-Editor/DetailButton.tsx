import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';

interface Props {
  setEditPage: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const DetailButton = ({ userId, setEditPage }: Props) => {
  const { data } = useSession();

  if (data?.user?.username !== userId) return <></>;

  return (
    <Box
      sx={{
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        mb: 1,
      }}
    >
      <Button
        variant="outlined"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          background: (theme) => `${theme.palette.primary.main}`,
          borderColor: 'primary.main',
          color: 'background.paper',
          '&:hover': {
            borderColor: 'primary.dark',
            background: (theme) => `${theme.palette.primary.dark}`,
          },
        }}
        onClick={() => setEditPage(true)}
      >
        글 수정하기
      </Button>
    </Box>
  );
};

export default DetailButton;
