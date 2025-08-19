interface Props {
  id: string;
  word: string;
  onClick: (wordId: string) => void;
}
const FavoriteCard = ({ id, word, onClick }: Props) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 xxs:p-8 xs:p-5 flex flex-col shadow-sm transition hover:border-indigo-500">
      <p className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 mb-4">{word}</p>
      <span className="self-end cursor-pointer text-sm font-semibold flex items-center text-indigo-600 hover:text-indigo-500" onClick={() => onClick(id)}>
        查看詳情
        <span className="material-symbols-outlined !text-lg">arrow_right_alt</span>
      </span>
    </div>
  );
};
export default FavoriteCard;
