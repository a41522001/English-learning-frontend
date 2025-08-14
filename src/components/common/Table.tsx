import clsx from 'clsx';
import React, { useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import type { Item, Props, TableHandle } from '../../types/table';
const assignTextAlign = (align: any) => (align ? `text-${align}` : 'text-left');

const Table = forwardRef<TableHandle, Props>(
  ({ headers = [], items = [], width = '100%', borderColor = '', bgColor = '', onClick, extraConfig, slots }, ref) => {
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const borderClass = borderColor ? `border-${borderColor}` : 'border-black';
    const bgClass = bgColor ? `bg-${bgColor}` : 'bg-white';
    const viewHeader = useMemo(() => {
      const result = [...headers];
      if (extraConfig) {
        const append = extraConfig.append;
        const prepend = extraConfig.prepend;
        if (append) {
          append.forEach((app) => {
            result.push(app);
          });
        }
        if (prepend) {
          prepend.forEach((prep) => {
            result.unshift(prep);
          });
        }
      }
      return result;
    }, [headers, extraConfig]);

    useImperativeHandle(
      ref,
      () => ({
        clearCurrentIndex,
      }),
      []
    );

    const clearCurrentIndex = () => {
      setCurrentIndex(-1);
    };
    const viewAppend = useMemo(() => {
      if (!extraConfig?.append) {
        return [];
      }
      const result = extraConfig.append.map((app) => {
        const align = assignTextAlign(app.textAlign);
        return {
          ...app,
          align,
        };
      });
      return result;
    }, [extraConfig]);

    const ViewPrepend = useMemo(() => {
      if (!extraConfig?.prepend) {
        return [];
      }
      const result = extraConfig.prepend.map((app) => {
        const align = assignTextAlign(app.textAlign);
        return {
          ...app,
          align,
        };
      });
      return result;
    }, [extraConfig]);
    const handleOnClick = (row: Item, index: number) => {
      setCurrentIndex(index);
      if (onClick) {
        onClick(row, index);
      }
    };

    return (
      <div className={clsx('table_wrap', bgClass, borderClass)}>
        <table className="w-full">
          <thead>
            <tr className={clsx('border-b', borderClass)}>
              {viewHeader.map((header) => {
                return (
                  <th className={clsx('table_space', assignTextAlign(header.textAlign))} key={header.key}>
                    {header.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item, rowIndex) => {
              return (
                <tr
                  data-active={rowIndex === currentIndex}
                  onClick={() => handleOnClick(item, rowIndex)}
                  className={clsx('table_row group', borderClass, rowIndex === currentIndex && 'current_row')}
                  key={rowIndex}
                >
                  {ViewPrepend.map((prep, prepIndex) => {
                    return (
                      <td className={clsx('table_space', prep.align)} key={prepIndex}>
                        {prep.child}
                      </td>
                    );
                  })}
                  {headers.map((header) => {
                    const align = header.textAlign ? `text-${header.textAlign}` : 'text-left';
                    const value = item[header.key];
                    const slot = slots?.[header.key];
                    const argument = { value, item, header, rowIndex };
                    return (
                      <td className={clsx('table_space', align)} key={header.key}>
                        {slot ? slot(argument) : value}
                      </td>
                    );
                  })}
                  {viewAppend.map((app, appIndex) => {
                    return (
                      <td className={clsx('table_space', app.align, rowIndex === currentIndex && 'text-white')} key={appIndex}>
                        {app.child}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);
export default Table;
