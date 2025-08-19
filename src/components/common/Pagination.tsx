import clsx from 'clsx';
import { useMemo } from 'react';
interface Props {
  length: number;
  itemPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const WINDOW = 5;
const Pagination = ({ length, itemPerPage, currentPage, setCurrentPage }: Props) => {
  const totalPages = Math.max(1, Math.ceil(length / itemPerPage));

  const pages = useMemo(() => {
    const n = Math.min(WINDOW, totalPages);
    if (totalPages <= n) return Array.from({ length: totalPages }, (_, i) => i + 1);

    let start = currentPage - Math.floor(n / 2);
    if (start < 1) start = 1;

    let end = start + n - 1;
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - n + 1;
    }
    return Array.from({ length: n }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination_wrap">
      <button className="pagination_prev_btn" disabled={currentPage === 1} onClick={() => handleSetCurrentPage(currentPage - 1)}>
        <span className="material-symbols-outlined !text-sm">arrow_back_ios</span>
      </button>
      {pages.map((item) => {
        return (
          <button
            className={clsx('pagination_btn', currentPage === item ? 'pagination_btn_active' : 'pagination_btn_base')}
            key={item}
            onClick={() => handleSetCurrentPage(item)}
          >
            {item}
          </button>
        );
      })}
      <button className="pagination_next_btn" disabled={currentPage === totalPages} onClick={() => handleSetCurrentPage(currentPage + 1)}>
        <span className="material-symbols-outlined !text-sm">arrow_forward_ios</span>
      </button>
    </div>
  );
};
export default Pagination;
