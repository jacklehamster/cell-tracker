import { Cell } from "../Cell";

export interface IBoundary {
  include(cell: Cell): boolean;
}
