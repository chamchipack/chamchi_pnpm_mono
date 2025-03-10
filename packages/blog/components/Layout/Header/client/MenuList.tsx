import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import ToggleStateAtom from '../state';

const MenuList = ({ ...props }) => {
  const router = useRouter();
  const [toggle, setToggle] = useRecoilState(ToggleStateAtom);

  const handleClick = (path: string) => {
    router.push(path);
    setToggle(false);
  };

  return (
    <>
      {props?.menu.map((item: any, index: number) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
            justifyContent: 'flex-start',
            mb: 2, // 메뉴 간 간격 추가
          }}
          onClick={() => handleClick(item.path)} // 각 메뉴에 맞는 경로로 이동
        >
          <Button
            sx={{
              height: 40,
              width: '100%',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              {item.label}
            </Typography>
          </Button>
        </Box>
      ))}
    </>
  );
};

export default MenuList;
