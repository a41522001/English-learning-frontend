import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
const SideBar = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const { pathname } = route;
  const links = [
    {
      path: '/',
      title: '每日單字',
      icon: 'home',
    },
    {
      path: '/learned',
      title: '已學單字',
      icon: 'check_circle',
    },
    {
      path: '/favorite',
      title: '我的最愛',
      icon: 'favorite',
    },
  ];
  const handleSelectRoute = (path: string) => {
    navigate(path);
  };
  return (
    <aside className="side_bar">
      <div className="side_bar_title_container">
        <div className="side_bar_logo"></div>
        <h1 className="side_bar_title">單字方舟</h1>
      </div>
      <nav className="md:p-4">
        <ul className="side_bar_ul">
          {links.map(({ path, title, icon }) => {
            return (
              <li className="side_bar_li group" key={path}>
                <a
                  className={clsx('side_bar_link', {
                    side_bar_current_link: path === pathname,
                  })}
                  onClick={() => handleSelectRoute(path)}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <span>{title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
export default SideBar;
