import Badge from './Badge';
interface Props {
  exampleSentenceEn: string;
  exampleSentenceZn: string;
  meanZh: string;
  partOfSpeech: string;
}
const ExpansionContent = ({ exampleSentenceEn, exampleSentenceZn, meanZh, partOfSpeech }: Props) => {
  return (
    <div className="bg-white p-4 border border-slate-200/80 rounded-xl last:mb-0 mb-3">
      <div className="flex justify-between mb-3 rounded-lg">
        <p className="text-slate-800">{meanZh}</p>
        <Badge bgColorClass="bg-indigo-100" textColorClass="text-indigo-800">
          {partOfSpeech}
        </Badge>
      </div>
      <div>
        <p className="italic text-slate-800">{exampleSentenceEn}</p>
        <p className="text-slate-500">{exampleSentenceZn}</p>
      </div>
    </div>
  );
};
export default ExpansionContent;
