import { Cell } from "./Cell";

export interface ICellListener {
  onCell(cell: Cell, previousCell: Cell): void;
};
