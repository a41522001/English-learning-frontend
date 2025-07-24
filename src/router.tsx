import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Broadcast from './pages/Broadcast';
import Home from './pages/Home';
import Daily from './pages/Daily';
import Learned from './pages/Learned';
import Favorite from './pages/Favorite';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            index: true,
            element: <Daily />,
          },
          {
            path: 'learned',
            element: <Learned />,
          },
          {
            path: 'favorite',
            element: <Favorite />,
          },
        ],
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/broadcast',
        element: <Broadcast />,
      },
    ],
  },
]);
export default router;
