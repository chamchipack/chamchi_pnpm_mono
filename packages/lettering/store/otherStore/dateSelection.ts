import { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const dateSelectionAtom = atom<Dayjs | null>({
  key: 'dateSelection',
  default: null,
  //   effects_UNSTABLE: [persistAtom],
});
