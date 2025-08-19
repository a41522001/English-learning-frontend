import Badge from '@/components/common/Badge';
import type { ReviewCardType } from '@/types';
import { getBadgeColor } from '@/utils';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends ReviewCardType {}
const ReviewCard = ({ wordExamples, category, categoryName, learnAt, word }: Props) => {
  return (
    <div className="mt-3">
      <div className="review_card">
        <div className="review_card_wrap">
          <div className="flex items-center">
            <Badge {...getBadgeColor(category)} className="text-sm">
              {categoryName}
            </Badge>
            <p className="review_card_date">學於 {learnAt}</p>
          </div>
          <p className="review_card_word">{word}</p>
        </div>
        <ul className="review_card_ul">
          {wordExamples.map((example, index) => {
            return (
              <li key={index} className={clsx('review_card_list', index !== wordExamples.length - 1 ? 'review_card_list_base' : '')}>
                <p className="flex-col-gap-1">
                  <span className="review_card_mean">定義</span>
                  <span>{example.meanZh}</span>
                </p>
                <p className="flex-col-gap-1">
                  <span className="review_card_sentence">例句</span>
                  <span className="italic">{example.exampleSentenceEn}</span>
                  <span className="text-slate-500">{example.exampleSentenceZn}</span>
                </p>
                <p className="review_card_speech_wrap">
                  <span className="review_card_speech">詞性:</span>
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
