import { Outlet } from 'react-router-dom';
import { DialogProvider } from './contexts/DialogContext';
import { LoadingProvider } from './contexts/LoadingContext';
const App = () => {
  return (
    <DialogProvider>
      <LoadingProvider>
        <Outlet />
      </LoadingProvider>
    </DialogProvider>
  );
};

export default App;
