import clsx from 'clsx';
import Badge from '../../components/common/Badge';
import React from 'react';
interface Props {
  wordId: string;
  isLearned: boolean;
  onChange: (wordId: string, isLearned: boolean) => void;
}
const LearnedBtn = ({ isLearned, onChange, wordId }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onChange(wordId, isLearned);
  };
  return (
    <span className="learned_btn_wrap">
      <span className={clsx(`material-symbols-outlined learned_btn ${isLearned ? 'learned_btn_active' : 'learned_btn_base'}`)} onClick={(e) => handleClick(e)}>
        check
      </span>
      {isLearned && (
        <Badge className="learned_badge" bgColorClass="bg-green-200" textColorClass="text-green-600">
          已學
        </Badge>
      )}
    </span>
  );
};
export default LearnedBtn;
