import { expect, it, describe, jest } from 'bun:test';
import { ICellTrigger, createCell, CellTriggerTracker } from '..';

describe('cell-trigger-tracker', () => {
  it('trigger tracked cells', () => {
    const cellTrigger: ICellTrigger = {
      cells: [createCell(5, 5, 5, 1)],
      activate: jest.fn(),
      deactivate: jest.fn(),
    };

    const tracker = new CellTriggerTracker({
      triggers: [cellTrigger],
    });

    tracker.trackCell(createCell(5, 0, 5, 1));
    expect(cellTrigger.activate).not.toHaveBeenCalled();

    tracker.trackCell(createCell(5, 5, 5, 1));
    expect(cellTrigger.activate).toHaveBeenCalled();

    tracker.untrackCells(new Set([createCell(5, 5, 5, 1).tag]));
    expect(cellTrigger.deactivate).toHaveBeenCalled();
  });
});
