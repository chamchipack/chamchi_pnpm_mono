import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const dateSelectionAtom = atom<string | null>({
  key: 'dateSelection',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
