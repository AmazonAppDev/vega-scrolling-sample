import {faker} from '@faker-js/faker';

import {CARD_CONFIG, ROW_CONFIG} from '../config';
import {HORIZONTAL_IMAGE_COUNT} from './HorizontalPosters';
import {
  CardData,
  CardType,
  RowData,
} from '../types';
import {VERTICAL_IMAGE_COUNT} from './VerticalPosters';

// Specifies the pattern for the card rows
export const ROW_ORDER: CardType[] = [
  'HERO',
  'VERTICAL',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'VERTICAL',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
];

const generateRowData = () => {
  const ROW_DATA: RowData[] = [];
  let hIndex = 1; // tracks how many horizontal images have been used
  let vIndex = 1; // tracks how many vertical images have been used
  let rowIndex = 0;
  
  let currentOffset = 0; // calculates offset of row from top. Useful for Flatlist getItemLayout prop
  while (hIndex <= HORIZONTAL_IMAGE_COUNT || vIndex <= VERTICAL_IMAGE_COUNT) {
    let data: CardData[] = [];
    let cardType: CardType = ROW_ORDER[rowIndex % ROW_ORDER.length];

    const title = `${faker.book.genre()} - Row ${rowIndex}`;
    if (cardType === 'VERTICAL') {
      for (let index = 0; index < ROW_CONFIG[cardType].ITEM_COUNT; index++) {
        if(vIndex > VERTICAL_IMAGE_COUNT) break;
        data.push({
          index: index,
          imageUrl: `file:///pkg/bundle/assets/assets/image/posters/vertical/${CARD_CONFIG[cardType].CARD.RESOLUTION}/${vIndex}.png`,
          rowIndex,
          cardType,
          dataIndex: vIndex,
        });
        vIndex++;
      }
    } else {
      for (let index = 0; index < ROW_CONFIG[cardType].ITEM_COUNT; index++) {
        if(hIndex > HORIZONTAL_IMAGE_COUNT) break;
        data.push({
          index: index,
          imageUrl: `file:///pkg/bundle/assets/assets/image/posters/horizontal/${CARD_CONFIG[cardType].CARD.RESOLUTION}/${hIndex}.png`,
          rowIndex,
          cardType,
          dataIndex: hIndex,
        });
        hIndex++;
      }
    }

    let rowData: RowData = {
      rowIndex,
      title,
      cardType,
      data,
      height: ROW_CONFIG[cardType].HEIGHT,
      offset: currentOffset,
      pagination: {
        isLoading: false,
        hasMore: true,
        error: null,
        lastRequestedPage: 0,
      },
    };
    currentOffset += ROW_CONFIG[cardType].HEIGHT;

    ROW_DATA.push(rowData);

    rowIndex++;
  }
  return ROW_DATA;
};

export const ROW_DATA = generateRowData();
