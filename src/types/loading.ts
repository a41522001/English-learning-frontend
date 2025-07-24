import type { ReactNode } from 'react';

export interface LoadingProps {
  isOpen: boolean;
}
export interface LoadingContextValue {
  setLoading: (val: boolean) => void;
}
export interface LoadContextProps {
  children: ReactNode;
}
