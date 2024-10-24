import { atom } from 'recoil';

export const darkModeState = atom<boolean>({
  key: 'darkModeState', // 고유한 키
  default: false, // 기본값은 다크 모드가 아님
});
