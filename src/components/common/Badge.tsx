import { type ReactNode } from 'react';
interface Props {
  children: ReactNode;
  textColorClass: string;
  bgColorClass: string;
}
const Badge = ({ children, bgColorClass, textColorClass }: Props) => {
  return <span className={`inline-block rounded-full px-2 ${bgColorClass} ${textColorClass}`}>{children}</span>;
};
export default Badge;
