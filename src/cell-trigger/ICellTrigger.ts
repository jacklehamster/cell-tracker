import { Cell } from "../Cell";

export interface ICellTrigger {
  get cell(): Cell;
  activate(): void;
  deactivate(): void;
}
