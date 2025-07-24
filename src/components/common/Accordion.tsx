import { useState } from 'react';
import clsx from 'clsx';
interface Items {
  title: string;
  content: string;
}
interface Props {
  items: Items[]; // 資料的標題與內容
  multiple?: boolean; // 多重開啟手風琴
  showOpenBtn?: boolean; // 全部開啟按鈕 (multiple未設置為true = 不啟用)
  showCloseBtn?: boolean; // 全部關閉按鈕 (multiple未設置為true = 不啟用)
}
interface AccordionItems extends Items {
  id: number;
}
const Accordion = ({
  items,
  multiple = false,
  showOpenBtn = false,
  showCloseBtn = false,
}: Props) => {
  const [accordionItems] = useState<AccordionItems[]>(() => {
    return items.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });
  });
  const [openItemIds, setOpenItemIds] = useState<number[]>([]);
  const baseClassName = 'grid transition-all duration-300 ease-in-out';
  const containerClassName = 'flex flex-col border rounded-sm';
  const titleClassName =
    'hover:cursor-pointer hover:bg-gray-100 p-3 flex items-center justify-between';
  const btnClassName = 'py-1 px-1 border rounded-sm hover:cursor-pointer hover:bg-gray-100';

  const handleExpansion = (id: number) => {
    setOpenItemIds((prevOpenIds) => {
      if (prevOpenIds.includes(id)) {
        return prevOpenIds.filter((item) => item !== id);
      }
      if (multiple) {
        return [...prevOpenIds, id];
      }
      return [id];
    });
  };

  const handleAllExpansion = (runType: boolean) => {
    if (runType) {
      setOpenItemIds(
        accordionItems.map((item) => {
          return item.id;
        })
      );
      return;
    }
    setOpenItemIds([]);
  };
  return (
    <>
      <div className="mb-3 flex gap-3">
        {showOpenBtn && multiple && (
          <button className={btnClassName} onClick={() => handleAllExpansion(true)}>
            全部展開
          </button>
        )}
        {showCloseBtn && multiple && (
          <button className={btnClassName} onClick={() => handleAllExpansion(false)}>
            全部收合
          </button>
        )}
      </div>
      <ul className={containerClassName}>
        {accordionItems.map(({ id, title, content }, index) => {
          return (
            <li
              className={clsx('flex', 'flex-col', {
                'border-b': index + 1 !== accordionItems.length,
              })}
              key={id}
            >
              <button
                className={clsx(titleClassName, {
                  'rounded-t-sm': index === 0,
                  'rounded-b-sm': index + 1 === accordionItems.length && !openItemIds.includes(id),
                })}
                onClick={() => handleExpansion(id)}
              >
                <h5>{title}</h5>
                <span
                  className={clsx('material-symbols-outlined', 'transition-transform', {
                    'rotate-180': openItemIds.includes(id),
                  })}
                >
                  keyboard_arrow_down
                </span>
              </button>
              <div
                className={`
                  ${baseClassName}
                  ${openItemIds.includes(id) ? 'grid-rows-[1fr] py-3' : 'grid-rows-[0fr]'}
                `}
              >
                <p className={`overflow-hidden px-3`}>{content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Accordion;
