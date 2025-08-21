import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface Props {
  [_id: string]: {
    title: string;
    base64: string;
    type: 'image';
    index: number;
  };
}

export const imageObjectsAtom = atom<Props | null>({
  key: 'imageObjectsAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
