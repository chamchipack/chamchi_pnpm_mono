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
        variant="contained"
        size="medium"
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          background: (theme) => `${theme.palette.common.black}`,
          color: 'background.paper',
          '&:hover': {
            background: (theme) => `${theme.palette.grey[400]}`,
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
