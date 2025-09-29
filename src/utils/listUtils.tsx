import React from 'react';

import {CARD_ROW_VARIATIONS, CARD_VARIATIONS} from '../components/Card';
import {CardData, CardProps, CardRowProps, CardType, RowData} from '../types';

export const cardKeyExtractor = (cardData: CardData, index: number) => {
  return `${cardData.cardType} CARD-${index} [${cardData.dataIndex}]`;
};

export const rowKeyExtractor = (rowData: RowData, index: number) => {
  return `${rowData.cardType} ROW-${index}`;
};

// Enables seamless switching between Flashlist and Carousel, alongside buildRowRenderer
export const buildCardRenderer = ({scroll, onFocus}: Partial<CardProps>) => {
  const renderCard = ({item}: {item: CardData; index: number}) => {
    const Card = CARD_VARIATIONS[item.cardType];
    return (
      <Card
        data={item}
        scroll={{
          vertically: scroll?.vertically,
          horizontally: scroll?.horizontally,
        }}
        onFocus={onFocus}
      />
    );
  };
  return renderCard;
};

export const buildRowRenderer = (
  scrollVertically?: (rowIndex: number) => void,
) => {
  const renderRow = ({item}: {item: RowData; index: number}) => {
    const CardRow = CARD_ROW_VARIATIONS[item.cardType];
    return <CardRow rowIndex={item.rowIndex} scrollVertically={scrollVertically} />;
  };
  return renderRow;
};

export const checkIfCardRowDataSame = (
  prevProps: CardRowProps,
  nextProps: CardRowProps,
) => {
  return prevProps.rowIndex === nextProps.rowIndex;
};
