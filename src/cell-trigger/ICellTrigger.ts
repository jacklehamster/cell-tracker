import { Cell } from "../Cell";
import { List } from "abstract-list";

export interface ICellTrigger {
  get cells(): List<Cell>;
  activate(): void;
  deactivate(): void;
}
