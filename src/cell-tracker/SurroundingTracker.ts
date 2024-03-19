import { Cell, Tag } from "../Cell";
import { ICellListener } from "./ICellListener";
import { DoubleLinkList, FreeStack } from "free-stack";
import { ICellTracker } from "./ICellTracker";
import { CellPool } from "./CellPool";

interface Config {
  range?: [number, number, number];
  cellLimit?: number;
  cellSize?: number;
}

interface Props {
  cellTrack: ICellTracker;
}

const DEFAULT_RANGE = [3, 3, 3];

export class SurroundingTracker implements ICellListener {
  private readonly cellTags: FreeStack<Tag> = new DoubleLinkList<Tag>("");
  private readonly cellTrack;
  private readonly cellPool: CellPool = new CellPool();
  private range: [number, number, number];
  private base: [number, number, number];
  private cellLimit: number;
  private cellSize: number;
  private readonly _trimmedTags: Set<string> = new Set();

  constructor({ cellTrack }: Props, { range, cellLimit, cellSize = 1 }: Config = {}) {
    this.range = [range?.[0] ?? DEFAULT_RANGE[0], range?.[1] ?? DEFAULT_RANGE[1], range?.[2] ?? DEFAULT_RANGE[2]];
    this.base = this.range.map(r => Math.ceil(-r / 2)) as [number, number, number];
    this.cellLimit = Math.max(0, cellLimit ?? 10);
    this.cellSize = cellSize ?? 1;
    this.cellTrack = cellTrack;
  }

  onCell(visitedCell: Cell): void {
    this.#iterateCells(visitedCell);
    this.#trimCells();
  }

  #iterateCells(visitedCell: Cell) {
    const { range, base } = this;
    const { pos: pos } = visitedCell;
    const cellX = pos[0] + base[0];
    const cellY = pos[1] + base[1];
    const cellZ = pos[2] + base[2];
    for (let z = 0; z < range[0]; z++) {
      for (let x = 0; x < range[2]; x++) {
        for (let y = 0; y < range[1]; y++) {
          this.#onCellVisit(this.cellPool.create(cellX + x, cellY + y, cellZ + z, this.cellSize));
        }
      }
    }
    this.cellPool.clear();
  }

  #onCellVisit(cell: Cell) {
    if (!this.cellTags.contains(cell.tag)) {
      if (this.cellTrack.trackCell(cell)) {
        this.cellTags.pushTop(cell.tag);
      }
    } else {
      this.cellTags.moveToTop(cell.tag);
    }
  }

  #trimCells() {
    //  remove any excess cells (oldest visited first)
    while (this.cellTags.size > this.cellLimit) {
      const removedTag = this.cellTags.popBottom();
      if (removedTag) {
        this._trimmedTags.add(removedTag);
      } else {
        break;
      }
    }
    if (this._trimmedTags.size) {
      this.cellTrack.untrackCells(this._trimmedTags);
      this._trimmedTags.clear();
    }
  }

  deactivate(): void {
    this.cellTags.clear();
  }
}
