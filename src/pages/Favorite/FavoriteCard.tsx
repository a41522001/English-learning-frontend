interface Props {
  id: string;
  word: string;
  onClick: (wordId: string) => void;
  onCancel: (wordId: string) => void;
}
const FavoriteCard = ({ id, word, onClick, onCancel }: Props) => {
  return (
    <div className="favorite_card">
      <p className="favorite_card_title">{word}</p>
      <div className="favorite_card_content">
        <span className="favorite_card_collect" onClick={() => onCancel(id)}>
          <span className="material-symbols-outlined filled !text-xs me-1">favorite</span>
          取消收藏
        </span>
        <span className="favorite_card_detail" onClick={() => onClick(id)}>
          查看詳情
          <span className="material-symbols-outlined !text-lg">arrow_right_alt</span>
        </span>
      </div>
    </div>
  );
};
export default FavoriteCard;
