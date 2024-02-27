import { ICellListener } from "./ICellListener";

export interface ICellChangeDetector {
  addListener(listener: ICellListener): void;
  removeListener(listener: ICellListener): void;
}
