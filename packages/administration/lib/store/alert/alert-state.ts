// store/otherStore/alert/alert-state.ts
import { atom } from 'recoil';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'auth';

export interface AlertModalState {
  open: boolean;
  message: string;
  type?: AlertType;
  onClose?: () => void;
  position?: 'top' | 'center' | 'bottom';
}

export const alertModalAtom = atom<AlertModalState>({
  key: 'alertModalAtom',
  default: {
    open: false,
    message: '',
    type: 'info',
    position: 'top',
  },
});
