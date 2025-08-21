import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const s3ImageAtom = atom<string[] | null>({
  key: 's3ImageAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
