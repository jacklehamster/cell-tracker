import { Cell, toCell } from "./Cell";
import { cellTag } from "./Cell";
import { Vector } from "dok-types";
import { ObjectPool } from "bun-pool";

export class CellPool extends ObjectPool<Cell, [number, number, number, number]> {
  constructor() {
    super((cell, cx, cy, cz, cellSize) => {
      const tag = cellTag(cx, cy, cz, cellSize);
      const x = cx * cellSize, y = cy * cellSize, z = cz * cellSize;
      if (!cell) {
        return { pos: [cx, cy, cz, cellSize], worldPosition: [x, y, z], tag }
      }
      cell.worldPosition[0] = x;
      cell.worldPosition[1] = y;
      cell.worldPosition[2] = z;
      cell.pos[0] = cx;
      cell.pos[1] = cy;
      cell.pos[2] = cz;
      cell.pos[3] = cellSize;
      cell.tag = tag;
      return cell;
    });
  }

  createFromPos(pos: Vector, cellSize: number): Cell {
    const cx = toCell(pos[0], cellSize);
    const cy = toCell(pos[1], cellSize);
    const cz = toCell(pos[2], cellSize);
    return this.create(cx, cy, cz, cellSize);
  }
}
