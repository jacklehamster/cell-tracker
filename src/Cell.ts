import { Vector } from "dok-types";

export type Tag = string;
export const CELL_SIZE_INDEX = 3;

export type Cell = {
  pos: [number, number, number, number];
  tag: Tag;
  worldPosition: Vector;
}

export function createCell(cx: number, cy: number, cz: number, cellSize: number): Cell {
  const tag = cellTag(cx, cy, cz, cellSize);
  const x = cx * cellSize, y = cy * cellSize, z = cz * cellSize;
  return { pos: [cx, cy, cz, cellSize], worldPosition: [x, y, z], tag };
}

export function updateCell(cell: Cell, cx: number, cy: number, cz: number, cellSize: number): Cell {
  const tag = cellTag(cx, cy, cz, cellSize);
  const x = cx * cellSize, y = cy * cellSize, z = cz * cellSize;
  cell.worldPosition[0] = x;
  cell.worldPosition[1] = y;
  cell.worldPosition[2] = z;
  cell.pos[0] = cx;
  cell.pos[1] = cy;
  cell.pos[2] = cz;
  cell.pos[3] = cellSize;
  cell.tag = tag;
  return cell;
}

export function cellTag(x: number, y: number, z: number, cellSize: number) {
  return x + "," + y + "," + z + "|" + cellSize;
}

export function toCell(x: number, cellSize: number) {
  return Math.round(x / cellSize);
}
