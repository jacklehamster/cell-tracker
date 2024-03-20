import { ICellTracker } from "../cell-tracker/ICellTracker";
import { Cell } from "../Cell";
import { ICellTrigger } from "./ICellTrigger";
import { List, forEach } from "abstract-list";

interface Props {
  triggers?: List<ICellTrigger> | ICellTrigger[];
}

export class CellTriggerTracker implements ICellTracker {
  readonly #triggers: Record<string, ICellTrigger[]> = {};

  constructor({ triggers }: Props) {
    if (triggers) {
      forEach(triggers, trigger => this.addTrigger(trigger));
    }
  }

  addTrigger(trigger?: ICellTrigger) {
    if (trigger) {
      forEach(trigger.cells, cell => {
        if (cell) {
          const triggers = this.#triggers[cell.tag] ?? (this.#triggers[cell.tag] = []);
          triggers.push(trigger);
        }
      });
    }
  }

  removeTrigger(trigger?: ICellTrigger) {
    if (trigger) {
      forEach(trigger.cells, cell => {
        if (cell) {
          const triggers = this.#triggers[cell.tag]?.filter(t => t === trigger);
          if (triggers) {
            if (triggers.length) {
              this.#triggers[cell.tag] = triggers;
            } else {
              delete this.#triggers[cell.tag];
            }
          }
        }
      });
    }
  }

  trackCell(cell: Cell): boolean {
    const cellTriggers = this.#triggers[cell.tag];
    if (cellTriggers) {
      for (let trigger of cellTriggers) {
        trigger.activate();
      }
    }
    return false;
  }

  untrackCells(cellTags: Set<string>): void {
    for (const tag of cellTags) {
      const cellTriggers = this.#triggers[tag];
      if (cellTriggers) {
        for (let trigger of cellTriggers) {
          trigger.deactivate();
        }
      }
    }
  }
}
