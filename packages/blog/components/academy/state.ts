import { atom } from 'recoil';

export const defaultValue = false;

const isEditPageon = atom<boolean>({
  key: 'isEditPageon',
  default: defaultValue,
});

export const isDetailPage = atom<boolean>({
  key: 'isDetailPage',
  default: false,
});

export const contents = atom<any>({
  key: 'contents',
  default: {},
});

export default isEditPageon;
