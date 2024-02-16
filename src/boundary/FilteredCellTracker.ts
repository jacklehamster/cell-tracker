import { Cell, ICellTracker } from "..";
import { IBoundary } from "./IBoundary";

interface Props {
  tracker: ICellTracker;
  boundary: IBoundary;
}

export class FilteredCellTracker implements ICellTracker {
  #boundary: IBoundary;
  #tracker: ICellTracker;
  constructor({ boundary, tracker }: Props) {
    this.#boundary = boundary;
    this.#tracker = tracker;
  }

  trackCell(cell: Cell): boolean {
    if (!this.#boundary.include(cell)) {
      return false;
    }
    return this.#tracker.trackCell(cell);
  }

  untrackCells(cellTags: Set<string>): void {
    this.#tracker.untrackCells(cellTags);
  }
}

export function filter(tracker: ICellTracker, boundary: IBoundary) {
  return new FilteredCellTracker({ tracker, boundary });
}
