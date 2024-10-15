import { atom } from 'recoil';

export const defaultValue = false;

const isEditPageon = atom<boolean>({
  key: 'isEditPageon',
  default: defaultValue,
});

export default isEditPageon;
