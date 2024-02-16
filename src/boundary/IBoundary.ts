import { Cell } from "../cell-tracker/Cell";

export interface IBoundary {
  include(cell: Cell): boolean;
}
