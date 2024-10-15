import { atom } from 'recoil';

export const defaultValue = false;

const ToggleStateAtom = atom<boolean>({
  key: 'ToggleStateAtom',
  default: defaultValue,
});

export default ToggleStateAtom;
