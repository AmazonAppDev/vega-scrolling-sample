// Avoid the config -> listConfig -> store -> data import cycle.
jest.mock('../../src/config', () => ({
  ROW_CONFIG: jest.requireActual('../../src/config/layout/rowConfig')
    .ROW_CONFIG,
}));

import {IMAGES, ROW_DATA} from '../../src/data';

describe('ROW_DATA', () => {
  it('has no empty row and ends at the row that uses up a poster pool', () => {
    expect(ROW_DATA.length).toBeGreaterThan(0);
    const used = {horizontal: [] as number[], vertical: [] as number[]};
    const exhaustedAt = ROW_DATA.map((row) => {
      expect(row.data.length).toBeGreaterThan(0);
      const pool = row.cardType === 'VERTICAL' ? 'vertical' : 'horizontal';
      used[pool].push(...row.data.map((card) => card.dataIndex));
      return (
        used.vertical.length >= IMAGES.vertical.length ||
        used.horizontal.length >= IMAGES.horizontal.length
      );
    });
    expect(exhaustedAt.indexOf(true)).toBe(ROW_DATA.length - 1);
    // Each poster is used at most once.
    for (const pool of ['horizontal', 'vertical'] as const) {
      expect(new Set(used[pool]).size).toBe(used[pool].length);
    }
  });
});
