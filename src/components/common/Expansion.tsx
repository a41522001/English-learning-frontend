import React from 'react';
import clsx from 'clsx';
import LearnedBtn from '../../pages/Learned/LearnedBtn';
import Badge from './Badge';
interface Props {
  id: string;
  index: number;
  children: React.ReactNode;
  title: string;
  category: string;
  isOpen: boolean;
  learned: boolean;
  onClick: (index: number) => void;
  onChangeLearned: (wordId: string, isLearned: boolean) => void;
}
const Expansion = ({ index, children, title, category, isOpen, onClick, learned, onChangeLearned, id }: Props) => {
  return (
    <div className="expansion">
      <div className="expansion_main" onClick={() => onClick(index)}>
        <div className="expansion_index">{index}</div>
        <div className="expansion_title_wrap">
          <div className="expansion_title">{title}</div>
          <Badge className="text-xs py-1" bgColorClass="bg-slate-100" textColorClass="text-slate-500">
            {category}
          </Badge>
        </div>
        <LearnedBtn isLearned={learned} wordId={id} onChange={onChangeLearned} />
        <span
          className={clsx('material-symbols-outlined expansion_arrow', {
            'rotate-180': isOpen,
          })}
        >
          keyboard_arrow_down
        </span>
      </div>
      {isOpen && <div className="expansion_list">{children}</div>}
    </div>
  );
};

export default Expansion;
