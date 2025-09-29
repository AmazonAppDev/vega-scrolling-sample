import { CardData } from '../types';
import { ROW_DATA } from '../data';
import { isCardDataArray } from '../utils';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockCardFetch = async (
  rowIndex: number, 
  startIndex: number, 
  count: number
): Promise<CardData[]> => {

  await delay(1000);
  
  const rowData = ROW_DATA[rowIndex];

  if (!rowData) {
    return [];
  }

  const cardDataArray = rowData.data.slice(startIndex, startIndex + count);
  
  console.log(`[API PAGINATION] Attempting to fetch cards for row ${rowIndex} from ${startIndex} to ${startIndex + count}`)

  if (isCardDataArray(cardDataArray)) {
    return cardDataArray
  } else {
    throw new Error('Invalid card data received from API');
  }
};

export const api = {
  cardApi: {
    fetchCards: mockCardFetch,
  },
};

export type ApiType = typeof api;
