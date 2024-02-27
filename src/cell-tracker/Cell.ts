import { Vector } from "dok-types";

export type Tag = string;
export const CELL_SIZE_INDEX = 3;

export type Cell = {
  pos: [number, number, number, number];
  tag: Tag;
  worldPosition: Vector;
}

export function cellTag(x: number, y: number, z: number, cellSize: number) {
  return x + "," + y + "," + z + "|" + cellSize;
}

export function toCell(x: number, cellSize: number) {
  return Math.round(x / cellSize);
}
