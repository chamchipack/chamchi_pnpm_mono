import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const defaultValue = [];

const MenuAtom = atom<any[]>({
  key: 'MenuAtom',
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export default MenuAtom;
