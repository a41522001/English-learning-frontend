import { useState, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import BroadcastCard from './BroadcastCard';
import { useApi } from '@/hooks/useApi';
import type { SubjectCategory, User } from '@/types';
import LogoutBtn from '@/components/common/LogoutBtn';
const initialUser = {
  username: '',
  email: '',
  id: '',
  created_at: new Date(),
};

const Broadcast = () => {
  const { apiGetUserinfo, apiCheckIsDaily, apiGetSubjectCategory, apiLogout } = useApi();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialUser);
  const [category, setCategory] = useState<SubjectCategory[]>([]);

  const handleSelectSubject = (subject: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        subject: subject,
      }).toString(),
    });
  };

  const handleGetUserinfo = async () => {
    const res = await apiCheckIsDaily();
    const idDaily = res.data.data.isDaily;
    if (idDaily) {
      navigate('/');
    } else {
      const [resUser, resCategory] = await Promise.all([apiGetUserinfo(), apiGetSubjectCategory()]);
      if (resUser && resCategory) {
        setUser(resUser.data.data);
        setCategory(resCategory.data.data);
      }
    }
  };

  const handleLogout = async () => {
    const res = await apiLogout();
    if (res.status === 200) {
      navigate('/login');
    }
  };
  useEffect(() => {
    handleGetUserinfo();
  }, []);

  return (
    <div className="broadcast_wrap">
      <header className="bg-white">
        <div className="broadcast_header">
          <div className="flex">
            <h1 className="broadcast_title">單字方舟</h1>
          </div>
          <LogoutBtn onClick={handleLogout} />
        </div>
      </header>
      <main className="broadcast_main">
        <div className="broadcast_main_container">
          <p className="broadcast_main_title">早安, {user.username}!</p>
          <p className="broadcast_main_subtitle">選擇一個主題，開始今天的學習挑戰吧！</p>
          <div className="broadcast_main_layout">
            {category.map(({ title, content, subject, bgColor, hoverColor, icon, iconColor }, index) => {
              return (
                <BroadcastCard
                  title={title}
                  content={content}
                  subject={subject}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  icon={icon}
                  iconColor={iconColor}
                  key={index}
                  onClick={(subject: string) => handleSelectSubject(subject)}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Broadcast;
