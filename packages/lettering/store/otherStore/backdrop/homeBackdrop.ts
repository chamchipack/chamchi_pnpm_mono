import { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isBackdropVisable = atom<boolean>({
  key: 'isBackdropVisable',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
