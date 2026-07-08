import {CardData} from '../types';
import {ROW_DATA} from '../data';

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

const mockCardFetch = async (
  rowIndex: number,
  startIndex: number,
  count: number,
): Promise<CardData[]> => {
  await delay(1000);

  const rowData = ROW_DATA[rowIndex];

  if (!rowData) {
    return [];
  }

  console.log(
    `[API PAGINATION] Attempting to fetch cards for row ${rowIndex} from ${startIndex} to ${
      startIndex + count
    }`,
  );

  return rowData.data.slice(startIndex, startIndex + count);
};

export const api = {
  cardApi: {
    fetchCards: mockCardFetch,
  },
};

export type ApiType = typeof api;
