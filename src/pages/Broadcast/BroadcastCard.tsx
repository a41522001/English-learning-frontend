import type { SubjectCategory } from '@/types';
import clsx from 'clsx';

interface Props extends SubjectCategory {
  onClick: (subject: string) => void;
  icon: string;
  iconColor: string;
}
const BroadcastCard = ({ title, content, subject, bgColor, hoverColor, onClick, icon, iconColor }: Props) => {
  return (
    <div className="broadcast_card_wrap group" onClick={() => onClick(subject)}>
      <div className={clsx(`broadcast_card_icon_wrap ${bgColor} ${hoverColor}`)}>
        <span className={clsx(`material-symbols-outlined broadcast_card_icon ${iconColor}`)}>{icon}</span>
      </div>
      <h4 className="broadcast_card_title">{title}</h4>
      <p className="broadcast_card_content">{content}</p>
    </div>
  );
};
export default BroadcastCard;
