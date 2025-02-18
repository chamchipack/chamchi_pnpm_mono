import { create } from 'zustand';

interface UserState {
  nickname: string;
  setNickName: (nickname: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: '', // ✅ 기본값 설정
  setNickName: (nickname) => set(() => ({ nickname })), // ✅ Zustand에서 상태 변경
}));
