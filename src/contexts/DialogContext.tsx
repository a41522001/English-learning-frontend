import { createContext, useCallback, useContext, useState } from 'react';
import Dialog from '../components/common/Dialog';
import type { DialogOption, DialogContextProps, DialogContextValue } from '../types/dialog';

const DialogContext = createContext<DialogContextValue | undefined>(undefined);
export const DialogProvider = ({ children }: DialogContextProps) => {
  const [dialogState, setDialogState] = useState<DialogOption | null>(null);
  const showDialog = useCallback((option: DialogOption) => setDialogState(option), []);
  const hideDialog = useCallback(() => {
    dialogState?.afterClose?.();
    setDialogState(null);
  }, [dialogState]);

  const value = {
    showDialog,
    hideDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog isOpen={!!dialogState} onClose={() => hideDialog()} {...dialogState}></Dialog>
    </DialogContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog 必須在 DialogProvider 內部使用');
  }
  return context;
};
