import React from 'react';
interface Props {
  index: number;
  children: React.ReactNode;
}
const Expansion = ({ index, children }: Props) => {
  return (
    <div className="border border-slate-200/80 rounded-xl p-4 bg-white hover:border-indigo-500 transition-all">
      <div className="flex items-center cursor-pointer">
        <div className="w-8 h-8 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-500 font-xs">
          {index}
        </div>
        <div></div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Expansion;
