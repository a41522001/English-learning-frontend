import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import clsx from 'clsx';
import TextInput from '@/components/common/TextInput';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import Badge from '@/components/common/Badge';
import Drawer from '@/components/common/Drawer';
import ReviewCard from './ReviewCard';
import { useApi } from '@/hooks/useApi';
import { formatDate, getBadgeColor } from '@/utils';
import type { Append, CellCtx, Header, Item, TableHandle } from '@/types/table';
import type { ReviewCardType } from '@/types';

const headers: Header[] = [
  {
    title: '單字',
    key: 'word',
    // textAlign: 'center',
  },
  {
    title: '分類',
    key: 'categoryName',
    textAlign: 'center',
  },
  {
    title: '學習時間',
    key: 'learnAt',
    textAlign: 'center',
  },
];
const itemPerPage: number = 10;
const Learned = () => {
  const { apiGetLearnedWordsPage, apiGetLearnedWordCount, apiGetWordExample, apiChangeFavorite } = useApi();
  const [words, setWords] = useState<Item[]>([]);
  const [viewHeaders, setViewHeaders] = useState<Header[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [wordCount, setWordCount] = useState<number>(0);
  const [model, setModel] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [reviewCardData, setReviewCardData] = useState<ReviewCardType>({
    category: '',
    categoryName: '',
    learnAt: '',
    word: '',
    wordExamples: [],
  });
  const tableRef = useRef<TableHandle>(null);

  // slot
  const slots = {
    word: ({ value, item }: CellCtx) => (
      <div className="flex items-center gap-3">
        <span
          className={clsx('material-symbols-outlined cursor-pointer', item.favorite && 'filled text-pink-600')}
          onClick={() => handleChangeFavorite(item.wordId, item.favorite)}
        >
          favorite
        </span>
        <span>{value}</span>
      </div>
    ),
    categoryName: ({ value, item }: CellCtx) => <Badge {...getBadgeColor(item.category)}>{value}</Badge>,
  };

  const append: Append[] = [
    {
      title: '',
      textAlign: 'center',
      key: 'append',
      child: (item: Item) => (
        <a className="review_btn" onClick={() => handleReview(item)}>
          複習
        </a>
      ),
    },
  ];

  const extraConfig = {
    append,
  };

  // 搜尋
  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 開啟抽屜並call複習API
  const handleReview = async (item: Item) => {
    if (!item.wordId) {
      return;
    }
    const res = await apiGetWordExample(item.wordId);
    const { category, categoryName, learnAt, word } = item;
    const wordExamples = res.data.data;
    setReviewCardData({
      category,
      categoryName,
      learnAt,
      word,
      wordExamples,
    });
    setModel(true);
  };

  // 關閉抽屜
  const handleOnCloseDrawer = () => {
    setModel(false);
  };

  // 切換分頁
  const handleSetCurrentPage = async (page: number) => {
    setCurrentPage(page);
    const res = await apiGetLearnedWordsPage({ itemPerPage, page });
    const resWord = res.data.data.map((item) => {
      const date = formatDate(item.learnAt);
      return {
        ...item,
        learnAt: date,
      };
    });
    setWords(resWord);
    tableRef.current?.clearCurrentIndex();
  };

  // 取得單字數量
  const handleGetWordCount = async () => {
    const res = await apiGetLearnedWordCount();
    setWordCount(res.data.data.count);
  };

  // 改變我的最愛狀態
  const handleChangeFavorite = async (wordId: string, favorite: boolean) => {
    const data = {
      wordId,
      status: !favorite,
    };
    const res = await apiChangeFavorite(data);
    if (res.status === 200) {
      await handleSetCurrentPage(currentPage);
    }
  };

  // 根據視窗調整header的顯示
  const handleHeader = () => {
    if (window.innerWidth > 640) {
      setViewHeaders(headers);
    } else if (window.innerWidth > 480) {
      setViewHeaders([headers[0], headers[2]]);
    } else {
      setViewHeaders([headers[0]]);
    }
  };

  // 根據視窗調整header的顯示
  useEffect(() => {
    handleHeader();
    window.addEventListener('resize', handleHeader);
    return () => {
      window.removeEventListener('resize', handleHeader);
    };
  }, []);

  // 初始化
  useEffect(() => {
    Promise.all([handleSetCurrentPage(1), handleGetWordCount()]);
  }, []);

  return (
    <div className="learned_wrap">
      <h2 className="learned_title">已學單字</h2>
      <div className="learned_subtitle">
        <p className="text-slate-500">溫故而知新，在這裡回顧你的學習足跡。</p>
        <TextInput className="learned_search" value={search} onChange={handleSetSearch} type="text" placeholder="搜索..." />
      </div>
      <div className="flex-col-gap-3">
        <Table headers={viewHeaders} items={words} borderColor="slate-200/80" extraConfig={extraConfig} slots={slots} ref={tableRef} />
        <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={wordCount} setCurrentPage={handleSetCurrentPage} />
      </div>
      <Drawer model={model} title="複習" onClose={handleOnCloseDrawer}>
        <ReviewCard {...reviewCardData} />
      </Drawer>
    </div>
  );
};
export default Learned;
