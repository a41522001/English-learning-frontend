import { useSearchParams, useNavigate } from 'react-router-dom';
import Expansion from '../../components/common/Expansion';
import ExpansionContent from '../../components/common/ExpansionContent';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Btn from '../../components/common/Btn';
import type { DailyWord, WordExample } from '@/types';
const Daily = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [words, setWords] = useState<DailyWord[]>([]);
  const { apiGetDailyWords, apiGetWordExample, apiSaveLearnedWord, apiDeleteLearnedWord } = useApi();
  const subject = searchParams.get('subject');

  const handleClick = async (index: number) => {
    const currentIndex = index - 1;
    const content: WordExample[] = [];
    if (!words[currentIndex].isOpen) {
      const res = await apiGetWordExample(words[currentIndex].id);
      content.splice(0, content.length, ...res.data.data);
    }
    setWords((prepValue) => {
      return prepValue.map((item, itemIndex) => {
        if (itemIndex === currentIndex) {
          return {
            ...item,
            isOpen: !item.isOpen,
            content: content,
          };
        }
        return {
          ...item,
        };
      });
    });
  };
  // 取得每日單字
  const handleGetDailyWords = async (subject: string) => {
    try {
      const res = await apiGetDailyWords(subject);
      const resWords = res.data.data;
      if (resWords.length === 0) {
        navigate('/broadcast');
        return;
      }
      setWords(() => {
        return resWords.map((item) => {
          return {
            ...item,
            isOpen: false,
            content: [],
          };
        });
      });
    } catch (error) {
      //
    }
  };
  // 儲存/刪除
  const handleChangeLearnedWord = async (wordId: string, isLearned: boolean) => {
    if (isLearned) {
      await apiDeleteLearnedWord(wordId);
    } else {
      await apiSaveLearnedWord({ wordId });
    }

    setWords((prevValue) => {
      return prevValue.map((item) => {
        if (item.id === wordId) {
          return {
            ...item,
            learned: !item.learned,
          };
        }
        return item;
      });
    });
  };
  // 儲存全部已學過單字
  const handleSaveLearnedAllWord = async () => {
    const wordIds = words.map((item) => item.id);
    await apiSaveLearnedWord({ wordId: wordIds });

    setWords((prevValue) => {
      return prevValue.map((item) => {
        return {
          ...item,
          learned: true,
        };
      });
    });
  };

  useEffect(() => {
    if (subject) {
      handleGetDailyWords(subject);
    } else {
      handleGetDailyWords('');
    }
  }, [subject]);

  return (
    <div className="daily_wrap">
      <h2 className="daily_title">每日單字</h2>
      <div className="daily_subtitle">
        <p className="text-slate-500">今天是你學習新知的最佳時機！</p>
        <Btn className="marked_learned_btn" onClick={handleSaveLearnedAllWord}>
          標示全部已學過
        </Btn>
      </div>
      <div className="flex-col-gap-3">
        {words.map((item, index) => {
          return (
            <Expansion
              id={item.id}
              index={index + 1}
              title={item.word}
              category={item.categoryName}
              isOpen={item.isOpen}
              key={item.id}
              onClick={handleClick}
              learned={item.learned}
              onChangeLearned={handleChangeLearnedWord}
            >
              {item.content?.map((contentItem, index) => {
                return <ExpansionContent key={index} {...contentItem} />;
              })}
            </Expansion>
          );
        })}
      </div>
    </div>
  );
};
export default Daily;
