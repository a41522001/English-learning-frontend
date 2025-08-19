import Btn from '@/components/common/Btn';
import ReactDOM from 'react-dom';
interface Props {
  word: string;
  id: string;
  isOpen: boolean;
  examples: [];
  onClose: () => void;
}
const FavoriteDialog = ({ isOpen, word, id, examples, onClose }: Props) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="favorite_dialog_wrap">
      <div className="favorite_dialog_content">
        <div className="favorite_dialog_header">
          <h3 className="favorite_dialog_title">{word}</h3>
          <div className="ms-auto flex items-center gap-3">
            <Btn>取消收藏</Btn>
            <Btn onClick={onClose}>關閉</Btn>
          </div>
        </div>
        <ul className="px-6 py-5 flex-col-gap-3">
          {examples.map((item, index) => {
            return (
              <li className="border border-slate-200 rounded-lg " key={index}>
                <div className="px-4 py-3 rounded-t-lg bg-slate-50 flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{item.partOfSpeech}</span>
                  <span className="text-slate-700 text-sm">{item.meanZh}</span>
                </div>
                <div className="px-5 py-4 rounded-b-lg flex-col-gap-1">
                  <p>{item.exampleSentenceEn}</p>
                  <p className="text-slate-500 text-sm">{item.exampleSentenceZn}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body
  );
};
export default FavoriteDialog;
