import type { ReactNode } from 'react';
type TextAlign = 'center' | 'left' | 'right';
export interface Header {
  title: string;
  key: string;
  textAlign?: TextAlign;
}
export interface Item {
  [key: string]: any;
}
export interface CellCtx {
  item: Item;
  value: any;
  header: Header;
  rowIndex: number;
}
export type CellSlot = (ctx: CellCtx) => React.ReactNode;
export interface Props {
  headers: Header[];
  items: Item[];
  width?: string;
  borderColor?: string;
  bgColor?: string;
  onClick?: (row: Item, index: number) => void;
  extraConfig?: {
    append?: Append[];
    prepend?: Prepend[];
  };
  slots?: Record<string, CellSlot>;
}
export interface Append {
  title: string;
  key: string;
  textAlign?: TextAlign;
  child?: ReactNode | ((item: Item, rowIndex: number) => React.ReactNode);
}
export interface ViewAppend extends Append {
  align: TextAlign;
}
export interface Prepend {
  title: string;
  key: string;
  textAlign?: TextAlign;
  child?: ReactNode | ((item: Item, rowIndex: number) => React.ReactNode);
}
export interface ViewPrepend extends Prepend {
  align: TextAlign;
}
export interface TableHandle {
  clearCurrentIndex: () => void;
}
