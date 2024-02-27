import { ICellListener } from "./ICellListener";

export interface ICellChangeDetector {
  addListener(listener: ICellListener): this;
  removeListener(listener: ICellListener): void;
}
