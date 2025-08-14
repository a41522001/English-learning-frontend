import { useState, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import BroadcastCard from '../components/common/BroadcastCard';
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
    // call API
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
      setUser(resUser.data.data);
      setCategory(resCategory.data.data);
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
    <div className="min-h-screen h-full flex flex-col">
      <header className="bg-white">
        <div className="max-w-5xl w-full p-4 mx-auto flex justify-between items-center">
          <div className="flex">
            <h1 className="text-xl font-bold text-slate-900">單字方舟</h1>
          </div>
          <LogoutBtn onClick={handleLogout} />
        </div>
      </header>
      <main className="grow flex-center py-10">
        <div className="max-w-5xl w-full px-4 sm:px-8 mx-auto flex flex-col items-center text-center">
          <p className="font-bold text-4xl text-slate-800 mb-2">早安, {user.username}!</p>
          <p className="text-lg text-slate-600 mb-10">選擇一個主題，開始今天的學習挑戰吧！</p>
          <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-6">
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
