import Badge from './Badge';
interface Props {
  exampleSentenceEn: string;
  exampleSentenceZn: string;
  meanZh: string;
  partOfSpeech: string;
}
const ExpansionContent = ({ exampleSentenceEn, exampleSentenceZn, meanZh, partOfSpeech }: Props) => {
  return (
    <div className="expansion_content_wrap">
      <div className="expansion_content_outline">
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
