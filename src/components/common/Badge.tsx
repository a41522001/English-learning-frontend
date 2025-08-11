import { type ReactNode } from 'react';
interface Props {
  children: ReactNode;
  textColorClass: string;
  bgColorClass: string;
  className?: string;
}
const Badge = ({ children, bgColorClass, textColorClass, className }: Props) => {
  return <span className={`inline-block rounded-full px-2 text-nowrap ${bgColorClass} ${textColorClass} ${className}`}>{children}</span>;
};
export default Badge;
