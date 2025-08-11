import { Outlet } from 'react-router-dom';
import SideBar from '../layout/SideBar';
import LogoutBtn from '../components/common/LogoutBtn';
import { useApi } from '@/hooks/useApi';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { apiLogout } = useApi();

  const handleLogout = async () => {
    const res = await apiLogout();
    if (res.status === 200) {
      navigate('/login');
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen md:min-h-auto">
      <div className="relative bg-white md:min-h-screen md:h-auto">
        <SideBar />
      </div>
      <LogoutBtn onClick={handleLogout} />
      <div className="grow px-4 py-4 md:px-8 md:py-6">
        <div className="max-full md:max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Home;
