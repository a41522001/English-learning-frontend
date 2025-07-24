import { useSearchParams } from 'react-router-dom';
import Expansion from '../components/common/Expansion';
import { useCallback, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
const Daily = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { apiGetDailyWords } = useApi();
  const subject = searchParams.get('subject');
  const handleGetDailyWords = async (subject: string) => {
    try {
      const res = await apiGetDailyWords(subject);
      console.log(res.data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (subject) {
      handleGetDailyWords(subject);
    } else {
      handleGetDailyWords('');
    }
  }, [subject]);
  return (
    <div className="flex flex-col">
      <h2 className="text-slate-800 font-bold text-2xl mb-1">每日單字</h2>
      <p className="text-slate-500 mb-6">今天是你學習新知的最佳時機！</p>
      <div>
        <Expansion index={1}></Expansion>
      </div>
    </div>
  );
};
export default Daily;
