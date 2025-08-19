import { useApi } from '@/hooks/useApi';
import FavoriteCard from './FavoriteCard';
import FavoriteDialog from './FavoriteDialog';
import { useEffect, useState } from 'react';
const Favorite = () => {
  const { apiGetFavoriteWord, apiGetWordExample } = useApi();
  const [words, setWords] = useState([]);
  const [examples, setExamples] = useState({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleGetFavoriteWords = async () => {
    const res = await apiGetFavoriteWord();
    setWords(res.data.data);
  };
  const handleViewDetail = async (wordId: string) => {
    const res = await apiGetWordExample(wordId);
    const word = words.find((item) => item.id === wordId);
    setExamples(() => {
      return {
        word: word.word,
        id: wordId,
        examples: res.data.data,
      };
    });
    console.log(res.data.data);
    setIsOpen(true);
  };
  useEffect(() => {
    handleGetFavoriteWords();
  }, []);
  return (
    <div className="favorite_wrap">
      <h2 className="favorite_title">我的最愛</h2>
      {/* <div className="learned_subtitle">
        <p className="text-slate-500">溫故而知新，在這裡回顧你的學習足跡。</p>
      </div> */}
      <div className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-2xl p-10 xs:p-4 max-h-[45rem] overflow-auto">
        {words.map((item) => {
          return <FavoriteCard key={item.id} word={item.word} id={item.id} onClick={handleViewDetail}></FavoriteCard>;
        })}
      </div>
      <FavoriteDialog {...examples} isOpen={isOpen} onClose={handleCloseDialog} />
    </div>
  );
};
export default Favorite;
