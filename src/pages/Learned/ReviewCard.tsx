import Badge from '@/components/common/Badge';
import type { ReviewCardType } from '@/types';
import { getBadgeColor } from '@/utils';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends ReviewCardType {}
const ReviewCard = ({ wordExamples, category, categoryName, learnAt, word }: Props) => {
  return (
    <div className="mt-3">
      <div className="border border-slate-200 rounded-lg bg-white w-70 sm:w-80 flex flex-col">
        <div className="flex flex-col gap-5 border-b border-slate-200 p-6">
          <div className="flex items-center">
            <Badge {...getBadgeColor(category)} className="text-sm">
              {categoryName}
            </Badge>
            <p className="text-xs text-slate-500 ms-auto">學於 {learnAt}</p>
          </div>
          <p className="font-bold text-3xl">{word}</p>
        </div>
        <ul className="p-6 overflow-y-auto max-h-150 ">
          {wordExamples.map((example, index) => {
            return (
              <li key={index} className={clsx('flex flex-col gap-6', index !== wordExamples.length - 1 ? 'border-b-1 border-slate-200 pb-3 mb-3' : '')}>
                <p className="flex-col-gap-1">
                  <span className="text-sm font-semibold text-slate-700">定義</span>
                  <span>{example.meanZh}</span>
                </p>
                <p className="flex-col-gap-1">
                  <span className="text-sm font-semibold text-slate-700">例句</span>
                  <span className="italic text-slate-900">{example.exampleSentenceEn}</span>
                  <span className="text-slate-500">{example.exampleSentenceZn}</span>
                </p>
                <p className="flex gap-1 text-sm">
                  <span className=" font-semibold text-slate-700">詞性:</span>
                  <span className="text-slate-500">{example.partOfSpeech}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ReviewCard;
