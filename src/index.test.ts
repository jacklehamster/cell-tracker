import { expect, it, describe, jest } from 'bun:test';
import { CellPool, SurroundingTracker } from "./index"
import { cellTag } from './cell-tracker/Cell';

describe('cell-tracker', () => {
    it('tracks surrounding cells', () => {
        const cellTrack = {
            trackCell: jest.fn(),
            untrackCells: jest.fn(),
        };

        const tracker = new SurroundingTracker({
            cellTrack,
        });
        const pool = new CellPool();
        tracker.visitCell(pool.create(0, 0, 0, 2));
        expect(cellTrack.trackCell).toHaveBeenCalledTimes(27);
    });
});
