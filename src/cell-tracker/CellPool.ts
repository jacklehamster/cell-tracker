import { Cell, createCell, toCell, updateCell } from "./Cell";
import { cellTag } from "./Cell";
import { Vector } from "dok-types";
import { ObjectPool } from "bun-pool";

export class CellPool extends ObjectPool<Cell, [number, number, number, number]> {
  constructor() {
    super((cell, cx, cy, cz, cellSize) => {
      return !cell ? createCell(cx, cy, cz, cellSize) : updateCell(cell, cx, cy, cz, cellSize);
    });
  }

  createFromPos(pos: Vector, cellSize: number): Cell {
    const cx = toCell(pos[0], cellSize);
    const cy = toCell(pos[1], cellSize);
    const cz = toCell(pos[2], cellSize);
    return this.create(cx, cy, cz, cellSize);
  }
}
