import { IMatrix, IPositionMatrix } from "dok-matrix";
import { Active } from "dok-types";
import { ICellListener } from "./ICellListener";
import { CELL_SIZE_INDEX, Cell } from "./Cell";
import { IChangeListener } from "change-listener";
import { CellPool } from "./CellPool";
import { ICellChangeDetector } from "./ICellChangeDetector";

interface Config {
  cellSize?: number;
}

interface Props {
  positionMatrix: IPositionMatrix;
}

export class CellChangeDetector implements Active, ICellChangeDetector {
  readonly #listeners = new Set<ICellListener>();
  private readonly positionMatrix: IPositionMatrix;
  private previousCell: Cell;
  private readonly listener: IChangeListener<IMatrix> = {
    onChange: () => this.#checkPosition(this.positionMatrix),
  };
  readonly #cellPool: CellPool = new CellPool();

  constructor({ positionMatrix }: Props, config?: Config) {
    const cellSize = config?.cellSize ?? 1;
    this.previousCell = this.#cellPool.create(
      Number.NaN,
      Number.NaN,
      Number.NaN,
      cellSize);
    this.positionMatrix = positionMatrix;
  }

  addListener(listener: ICellListener): void {
    this.#listeners.add(listener);
  }

  removeListener(listener: ICellListener): void {
    this.#listeners.delete(listener);
  }

  #checkPosition(posMatrix: IPositionMatrix): void {
    let cell = this.#cellPool.createFromPos(posMatrix.position, this.previousCell.pos[CELL_SIZE_INDEX]);
    if (this.previousCell.pos[0] !== cell.pos[0] || this.previousCell.pos[1] !== cell.pos[1] || this.previousCell.pos[2] !== cell.pos[2]) {
      for (const listener of this.#listeners) {
        listener.onCell(cell, this.previousCell);
      }
      const temp = this.previousCell;
      this.previousCell = cell;
      cell = temp;
    }
    this.#cellPool.recycle(cell);
  }

  activate(): void {
    this.positionMatrix.addChangeListener(this.listener);
    this.previousCell.pos[0] = Number.NaN;
    this.previousCell.pos[1] = Number.NaN;
    this.previousCell.pos[2] = Number.NaN;
    this.#checkPosition(this.positionMatrix);
  }

  deactivate(): void {
    this.positionMatrix.removeChangeListener(this.listener);
  }
}
