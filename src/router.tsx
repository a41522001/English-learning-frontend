import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Broadcast from './pages/Broadcast/Broadcast';
import Home from './pages/Home/Home';
import Daily from './pages/Daily/Daily';
import Learned from './pages/Learned/Learned';
import Favorite from './pages/Favorite/Favorite';
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
