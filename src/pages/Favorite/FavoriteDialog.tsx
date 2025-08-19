import Btn from '@/components/common/Btn';
import type { WordExample } from '@/types';
import ReactDOM from 'react-dom';
interface Props {
  word: string;
  id: string;
  isOpen: boolean;
  examples: WordExample[];
  onClose: () => void;
  onCancel: (wordId: string) => void;
}
const FavoriteDialog = ({ isOpen, word, id, examples, onClose, onCancel }: Props) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="favorite_dialog_wrap">
      <div className="favorite_dialog_content">
        <div className="favorite_dialog_header">
          <h3 className="favorite_dialog_title">{word}</h3>
          <div className="favorite_dialog_btn_wrap">
            <Btn className="favorite_dialog_cancel_btn" onClick={() => onCancel(id)}>
              <span className="material-symbols-outlined filled !text-base me-1">favorite</span>
              取消收藏
            </Btn>
            <Btn className="favorite_dialog_close_btn" onClick={onClose}>
              關閉
            </Btn>
          </div>
        </div>
        <ul className="favorite_dialog_ul">
          {examples.map((item, index) => {
            return (
              <li className="favorite_dialog_li" key={index}>
                <div className="favorite_dialog_li_header">
                  <span className="favorite_dialog_li_speech">{item.partOfSpeech}</span>
                  <span className="favorite_dialog_li_mean">{item.meanZh}</span>
                </div>
                <div className="favorite_dialog_li_content">
                  <p>{item.exampleSentenceEn}</p>
                  <p className="favorite_dialog_li_content_sentence">{item.exampleSentenceZn}</p>
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
