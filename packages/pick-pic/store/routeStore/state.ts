import { atom } from 'recoil';

export const pageHistoryAtom = atom<{
  prev: string | null;
  current: string | null;
}>({
  key: 'pageHistoryAtom',
  default: {
    prev: null,
    current: null,
  },
});
