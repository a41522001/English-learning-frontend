interface Props {
  length: number;
  itemPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
import clsx from 'clsx';
import { useMemo } from 'react';
const Pagination = ({ length, itemPerPage, currentPage, setCurrentPage }: Props) => {
  const paginationCount = useMemo(() => {
    const count = Math.ceil(length / itemPerPage);
    const arr = Array.from({ length: count }, (v, i) => i + 1);
    return arr;
  }, [length, itemPerPage]);

  const handleSetCurrentPage = (page: number) => {
    if (page > paginationCount.length || page === 0) {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center">
      <button
        className="pl-3 pr-2 py-1 cursor-pointer border flex-center border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => handleSetCurrentPage(currentPage - 1)}
      >
        <span className="material-symbols-outlined !leading-[1rem] !text-sm">arrow_back_ios</span>
      </button>
      {paginationCount.map((item) => {
        return (
          <button
            className={clsx(
              'cursor-pointer py-1 px-3 border-1 flex-center border-gray-300 not-first:border-l-transparent hover:bg-blue-100',
              currentPage === item ? 'bg-blue-200 font-semibold text-blue-800' : 'text-gray-700'
            )}
            key={item}
            onClick={() => handleSetCurrentPage(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        className="pr-3 pl-2 py-1 cursor-pointer border flex-center border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => handleSetCurrentPage(currentPage + 1)}
      >
        <span className="material-symbols-outlined !text-sm">arrow_forward_ios</span>
      </button>
    </div>
  );
};
export default Pagination;
