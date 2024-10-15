'use client';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRecoilState } from 'recoil';
import ToggleStateAtom from '../state';

export default function ToggleButton() {
  const [toggle, setToggle] = useRecoilState(ToggleStateAtom);
  return (
    <>
      <IconButton color="inherit" onClick={() => setToggle(!toggle)}>
        <MenuIcon sx={{ color: 'text.disabled' }} />
      </IconButton>
    </>
  );
}
