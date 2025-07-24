import type { ReactNode } from 'react';

export interface DialogOption {
  title?: string;
  message?: string;
  width?: string;
  showCloseBtn?: boolean;
  children?: ReactNode;
  afterClose?: () => void;
}
export interface DialogProps extends DialogOption {
  isOpen: boolean;
  onClose?: () => void;
}
export interface DialogContextProps {
  children: ReactNode;
}
export interface DialogContextValue {
  showDialog(option: DialogOption): void;
  hideDialog(): void;
}
