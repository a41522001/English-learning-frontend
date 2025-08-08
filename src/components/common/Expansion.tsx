import React from 'react';
import clsx from 'clsx';
interface Props {
  index: number;
  children: React.ReactNode;
  title: string;
  category: string;
  isOpen: boolean;
  onClick: (index: number) => void;
}

const Expansion = ({ index, children, title, category, isOpen, onClick }: Props) => {
  return (
    <div className="border border-slate-200/80 rounded-xl bg-white hover:border-indigo-500 transition-all duration-300">
      <div className="flex items-center cursor-pointer p-4" onClick={() => onClick(index)}>
        <div className="w-8 h-8 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-500 font-xs me-3">{index}</div>
        <div>
          <div className="mb-1 font-bold">{title}</div>
          <div className="rounded-full bg-slate-100 text-slate-500 px-2 py-1 text-xs">{category}</div>
        </div>
        <span
          className={clsx('material-symbols-outlined ms-auto text-slate-500 transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        >
          keyboard_arrow_down
        </span>
      </div>
      {isOpen && <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-xl">{children}</div>}
    </div>
  );
};

export default Expansion;
