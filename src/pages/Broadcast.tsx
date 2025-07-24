import { useState, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import type { BroadcastData, User, Subject } from '../types/broadcast';
import BroadcastCard from '../components/common/BroadcastCard';
import { useApi } from '@/hooks/useApi';
const initialUser = {
  username: '',
  email: '',
  id: '',
  created_at: '',
};
const broadcastData: BroadcastData[] = [
  {
    title: '人物與職業',
    content: '探索各行各業的單字與對話',
    subject: 'People_Jobs',
    bgColor: 'bg-blue-300',
    hoverColor: 'group-hover:bg-blue-400',
    icon: 'group',
    iconColor: 'text-blue-500',
  },
  {
    title: '身體與健康',
    content: '學習描述身體部位與健康狀況',
    subject: 'Body_Health',
    bgColor: 'bg-red-300',
    hoverColor: 'group-hover:bg-red-400',
    icon: 'monitor_heart',
    iconColor: 'text-red-500',
  },
  {
    title: '飲食',
    content: '品嚐世界各地的美食與飲品詞彙',
    subject: 'Food_Drinks',
    bgColor: 'bg-orange-300',
    hoverColor: 'group-hover:bg-orange-400',
    icon: 'restaurant',
    iconColor: 'text-orange-500',
  },
  {
    title: '家庭與居家',
    content: '打造溫馨家園的相關單字',
    subject: 'Home_Furniture',
    bgColor: 'bg-amber-300',
    hoverColor: 'group-hover:bg-amber-400',
    icon: 'home',
    iconColor: 'text-amber-500',
  },
  {
    title: '學校與教育',
    content: '重溫校園生活與學習的點滴',
    subject: 'School_Education',
    bgColor: 'bg-purple-300',
    hoverColor: 'group-hover:bg-purple-400',
    icon: 'school',
    iconColor: 'text-purple-500',
  },
  {
    title: '交通與方向',
    content: '掌握問路與搭乘交通工具的用語',
    subject: 'Transportation_Directions',
    bgColor: 'bg-green-300',
    hoverColor: 'group-hover:bg-green-400',
    icon: 'directions_car',
    iconColor: 'text-green-500',
  },
  {
    title: '城市與地點',
    content: '遊覽城市地標與建築的必備詞彙',
    subject: 'Places_Buildings',
    bgColor: 'bg-slate-300',
    hoverColor: 'group-hover:bg-slate-400',
    icon: 'location_city',
    iconColor: 'text-slate-500',
  },
  {
    title: '時間與日期',
    content: '精準描述時間，安排您的行事曆',
    subject: 'Time_Calendar',
    bgColor: 'bg-cyan-300',
    hoverColor: 'group-hover:bg-cyan-400',
    icon: 'calendar_month',
    iconColor: 'text-cyan-500',
  },
  {
    title: '數字與數量',
    content: '從基礎計數到複雜單位的表達',
    subject: 'Numbers_Quantities',
    bgColor: 'bg-gray-300',
    hoverColor: 'group-hover:bg-gray-400',
    icon: 'tag',
    iconColor: 'text-gray-500',
  },
  {
    title: '顏色與形狀',
    content: '為世界塗上色彩，描述萬物型態',
    subject: 'Colors_Shapes',
    bgColor: 'bg-pink-300',
    hoverColor: 'group-hover:bg-pink-400',
    icon: 'palette',
    iconColor: 'text-pink-500',
  },
  {
    title: '動物與植物',
    content: '認識自然界的動植物夥伴',
    subject: 'Animals_Plants',
    bgColor: 'bg-lime-300',
    hoverColor: 'group-hover:bg-lime-400',
    icon: 'eco',
    iconColor: 'text-lime-500',
  },
  {
    title: '氣候與自然',
    content: '聊聊天氣，感受大自然的鬼斧神工',
    subject: 'Weather_Nature',
    bgColor: 'bg-sky-300',
    hoverColor: 'group-hover:bg-sky-400',
    icon: 'partly_cloudy_day',
    iconColor: 'text-sky-500',
  },
  {
    title: '休閒與活動',
    content: '分享您的興趣，探索休閒生活',
    subject: 'Hobbies_Activities',
    bgColor: 'bg-yellow-200',
    hoverColor: 'group-hover:bg-yellow-300',
    icon: 'sports_esports',
    iconColor: 'text-yellow-500',
  },
  {
    title: '科技與媒體',
    content: '跟上數位時代，聊聊科技趨勢',
    subject: 'Technology_Media',
    bgColor: 'bg-indigo-300',
    hoverColor: 'group-hover:bg-indigo-400',
    icon: 'smartphone',
    iconColor: 'text-indigo-500',
  },
  {
    title: '感受與情緒',
    content: '學習表達內心感受與豐富的情緒',
    subject: 'Feelings_Emotions',
    bgColor: 'bg-rose-300',
    hoverColor: 'group-hover:bg-rose-400',
    icon: 'sentiment_satisfied',
    iconColor: 'text-rose-500',
  },
  {
    title: '動作與日常生活',
    content: '描述每天的例行公事與各種動作',
    subject: 'Actions_Daily',
    bgColor: 'bg-teal-300',
    hoverColor: 'group-hover:bg-teal-400',
    icon: 'schedule',
    iconColor: 'text-teal-500',
  },
  {
    title: '價值與品格',
    content: '探討個人特質與正向的價值觀',
    subject: 'Values_Personality',
    bgColor: 'bg-stone-300',
    hoverColor: 'group-hover:bg-stone-400',
    icon: 'diamond',
    iconColor: 'text-stone-500',
  },
  {
    title: '購物與金錢',
    content: '聰明消費，學習購物與理財的用語',
    subject: 'Shopping_Money',
    bgColor: 'bg-emerald-300',
    hoverColor: 'group-hover:bg-emerald-400',
    icon: 'shopping_cart',
    iconColor: 'text-emerald-500',
  },
  {
    title: 'Un開頭',
    content: "學習 'Un-' 字首，表達否定與相反",
    subject: 'Un',
    bgColor: 'bg-red-400',
    hoverColor: 'group-hover:bg-red-500',
    icon: 'undo',
    iconColor: 'text-red-600',
  },
  {
    title: 'Re開頭',
    content: "學習 'Re-' 字首，掌握重複與再生的概念",
    subject: 'Re',
    bgColor: 'bg-blue-400',
    hoverColor: 'group-hover:bg-blue-500',
    icon: 'replay',
    iconColor: 'text-blue-600',
  },
  {
    title: 'In開頭',
    content: "學習 'In-' 字首，探索 '內' 與 '無' 的意義",
    subject: 'In',
    bgColor: 'bg-neutral-300',
    hoverColor: 'group-hover:bg-neutral-400',
    icon: 'login',
    iconColor: 'text-neutral-500',
  },
  {
    title: 'Dis開頭',
    content: "學習 'Dis-' 字首，理解分離與否定的用法",
    subject: 'Dis',
    bgColor: 'bg-violet-400',
    hoverColor: 'group-hover:bg-violet-500',
    icon: 'link_off',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Pre開頭',
    content: "學習 'Pre-' 字首，預見未來，談論先前",
    subject: 'Pre',
    bgColor: 'bg-green-400',
    hoverColor: 'group-hover:bg-green-500',
    icon: 'fast_forward',
    iconColor: 'text-green-600',
  },
  {
    title: '其他',
    content: '包含各種實用且不易分類的單字',
    subject: 'Other',
    bgColor: 'bg-zinc-300',
    hoverColor: 'group-hover:bg-zinc-400',
    icon: 'extension',
    iconColor: 'text-zinc-500',
  },
];

const Broadcast = () => {
  const { apiGetUserinfo } = useApi();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialUser);
  const handleSelectSubject = (subject: Subject) => {
    // call API
    navigate({
      pathname: '/',
      search: createSearchParams({
        subject: subject,
      }).toString(),
    });
  };
  const handleGetUserinfo = async () => {
    const res = await apiGetUserinfo();
    setUser(res.data.data);
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
          <div></div>
        </div>
      </header>
      <main className="grow flex-center py-10">
        <div className="max-w-5xl w-full px-4 sm:px-8 mx-auto flex flex-col items-center text-center">
          <p className="font-bold text-4xl text-slate-800 mb-2">早安, {user.username}!</p>
          <p className="text-lg text-slate-600 mb-10">選擇一個主題，開始今天的學習挑戰吧！</p>
          <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {broadcastData.map(({ title, content, subject, bgColor, hoverColor, icon, iconColor }, index) => {
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
                  onClick={(subject: Subject) => handleSelectSubject(subject)}
                ></BroadcastCard>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Broadcast;
