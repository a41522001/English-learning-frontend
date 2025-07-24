import { Outlet } from 'react-router-dom';
import SideBar from '../layout/SideBar';
const Home = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen md:min-h-auto">
      <div className="">
        <SideBar />
      </div>
      <div className="grow px-8 py-6">
        <div className="max-full md:max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Home;
