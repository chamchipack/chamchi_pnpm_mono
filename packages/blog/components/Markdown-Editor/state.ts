import { atom } from 'recoil';

export const defaultValue = false;

const EditPageAtom = atom<boolean>({
  key: 'EditPageAtom',
  default: defaultValue,
});

export default EditPageAtom;
