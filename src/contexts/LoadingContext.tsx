import { createContext, useContext, useState } from 'react';
import Loading from '@/components/common/Loading';
import type { LoadContextProps, LoadingContextValue } from '@/types/loading';

const loadingContext = createContext<LoadingContextValue | undefined>(undefined);
export const LoadingProvider = ({ children }: LoadContextProps) => {
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const setLoading = (loading: boolean) => {
    SetIsOpen(loading);
  };

  const value = {
    setLoading,
  };

  return (
    <loadingContext.Provider value={value}>
      {children}
      <Loading isOpen={isOpen} />
    </loadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const context = useContext(loadingContext);
  if (context === undefined) {
    throw new Error('useLoading 必須在 LoadingProvider 內部使用');
  }
  return context;
};
