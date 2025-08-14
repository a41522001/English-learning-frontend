import TextInput from '@/components/common/TextInput';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import Badge from '@/components/common/Badge';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState, useRef } from 'react';
import { formatDate, getBadgeColor } from '@/utils';
import type { CellCtx, Header, Item, TableHandle } from '@/types/table';

const headers = [
  {
    title: '單字',
    key: 'word',
    textAlign: 'center',
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
  const { apiGetLearnedWordsPage, apiGetLearnedWordCount } = useApi();
  const [words, setWords] = useState<Item[]>([]);
  const [viewHeaders, setViewHeaders] = useState<Header[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [wordCount, setWordCount] = useState<number>(0);
  const tableRef = useRef<TableHandle>(null);

  // slot
  const slots = {
    categoryName: ({ value, item }: CellCtx) => <Badge {...getBadgeColor(item.category)}>{value}</Badge>,
  };

  const append = [
    {
      title: '',
      textAlign: 'center',
      key: 'append',
      child: <a className="review_btn">複習</a>,
    },
  ];
  const extraConfig = {
    append,
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

  useEffect(() => {
    Promise.all([handleSetCurrentPage(1), handleGetWordCount()]);
  }, []);

  useEffect(() => {
    setViewHeaders(headers);
  }, []);
  return (
    <div className="learned_wrap">
      <h2 className="learned_title">已學單字</h2>
      <div className="learned_subtitle">
        <p className="text-slate-500">溫故而知新，在這裡回顧你的學習足跡。</p>
        <TextInput className="px-3 py-2" type="text" />
      </div>
      <div>
        <Table headers={viewHeaders} items={words} borderColor="slate-200/80" extraConfig={extraConfig} slots={slots} ref={tableRef} />
        <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={wordCount} setCurrentPage={handleSetCurrentPage} />
      </div>
    </div>
  );
};
export default Learned;
