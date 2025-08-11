import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';

const Learned = () => {
  const { apiGetLearnedWords } = useApi();
  const getLearnedWords = async () => {
    const res = await apiGetLearnedWords();
    console.log(res.data.data);
  };
  useEffect(() => {
    getLearnedWords();
  }, []);
  return <>Learned</>;
};
export default Learned;
