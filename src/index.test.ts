import { expect, it, describe, jest } from 'bun:test';
import { CellPool, SurroundingTracker } from "./index"

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
        tracker.onCell(pool.create(0, 0, 0, 2));
        expect(cellTrack.trackCell).toHaveBeenCalledTimes(27);
    });
});
