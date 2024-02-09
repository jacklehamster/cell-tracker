import { Cell } from "./Cell";

export interface IVisitableCell {
  visitCell(cell: Cell): void;
};
