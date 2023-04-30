export interface TableProps<T> {
  rows: T[];
  columns: (keyof T)[];
  onChangePagination?: (page: number) => void;
  onClickRow?: (row: T) => void;
}

export type RowType = string | number | boolean | Date;
