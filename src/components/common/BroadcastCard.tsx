import type { SubjectCategory } from '@/types';
import clsx from 'clsx';

interface Props extends SubjectCategory {
  onClick: (subject: string) => void;
  icon: string;
  iconColor: string;
}
const BroadcastCard = ({ title, content, subject, bgColor, hoverColor, onClick, icon, iconColor }: Props) => {
  return (
    <div
      className="group rounded-2xl shadow-lg p-8 bg-white flex flex-col items-center cursor-pointer hover:-translate-y-3 transition-transform"
      onClick={() => onClick(subject)}
    >
      <div className={clsx(`w-16 h-16 rounded-full mb-6 transition-colors flex items-center justify-center ${bgColor} ${hoverColor}`)}>
        <span className={clsx(`material-symbols-outlined group-hover:text-white transition-colors ${iconColor}`)}>{icon}</span>
      </div>
      <h4 className="mb-1 text-xl text-slate-900 font-bold">{title}</h4>
      <p className="text-slate-500 text-center">{content}</p>
    </div>
  );
};
export default BroadcastCard;
