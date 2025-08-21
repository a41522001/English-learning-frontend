import { useApi } from '@/hooks/useApi';
import FavoriteCard from './FavoriteCard';
import FavoriteDialog from './FavoriteDialog';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { FavoriteExample, FavoriteWord } from '@/types';
import TextInput from '@/components/common/TextInput';
const Favorite = () => {
  const { apiGetFavoriteWord, apiGetWordExample, apiChangeFavorite } = useApi();
  const [words, setWords] = useState<FavoriteWord[]>([]);
  const [examples, setExamples] = useState<FavoriteExample>({
    word: '',
    id: '',
    examples: [],
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  // 取得我的最愛單字
  const handleGetFavoriteWords = async () => {
    const res = await apiGetFavoriteWord();
    setWords(res.data.data);
  };

  // 開啟詳情dialog並call例句API
  const handleViewDetail = async (wordId: string) => {
    const res = await apiGetWordExample(wordId);
    const word = words.find((item) => item.id === wordId)!;
    setExamples(() => {
      return {
        word: word.word,
        id: wordId,
        examples: res.data.data,
      };
    });
    setIsOpen(true);
  };

  // 取消收藏我ˇ的最愛
  const handleCancelCollect = async (wordId: string) => {
    console.log(wordId);
    const data = {
      wordId,
      status: false,
    };
    const res = await apiChangeFavorite(data);
    if (res.status === 200) {
      handleGetFavoriteWords();
    }
  };
  // 搜尋
  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    handleGetFavoriteWords();
  }, []);

  return (
    <div className="favorite_wrap">
      <h2 className="favorite_title">我的最愛</h2>
      <div className="favorite_subtitle">
        <p className="text-slate-500">收藏屬於你的字彙，讓學習更有溫度。</p>
        <TextInput className="favorite_search" value={search} onChange={handleSetSearch} type="text" placeholder="搜索..." />
      </div>
      {words.length === 0 ? (
        <p className="favorite_empty">從第一個最愛開始，打造專屬字庫！</p>
      ) : (
        <>
          {' '}
          <div className="favorite_content">
            {words.map((item) => {
              return <FavoriteCard key={item.id} word={item.word} id={item.id} onClick={handleViewDetail} onCancel={handleCancelCollect} />;
            })}
          </div>
          <FavoriteDialog {...examples} isOpen={isOpen} onClose={handleCloseDialog} onCancel={handleCancelCollect} />
        </>
      )}
    </div>
  );
};
export default Favorite;
