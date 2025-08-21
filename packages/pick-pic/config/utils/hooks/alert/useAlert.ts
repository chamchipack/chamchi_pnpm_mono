import {
  alertModalAtom,
  AlertType,
} from '@/store/otherStore/alert/alert-state';
import { useSetRecoilState } from 'recoil';

export function useAlert() {
  const setAlert = useSetRecoilState(alertModalAtom);

  const showAlert = ({
    message,
    type = 'info',
    position = 'top',
  }: {
    message: string;
    type?: AlertType;
    position?: 'top' | 'bottom';
  }) => {
    setAlert({
      open: true,
      message,
      type,
      position,
    });
  };

  return showAlert;
}
