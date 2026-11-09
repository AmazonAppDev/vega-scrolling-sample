import React from 'react';
import {CARD_VARIATIONS} from '../components/CardVariations';
import {CardData, CardProps, CardRowProps, RowData} from '../types';
import {CARD_ROW_VARIATIONS} from '../components/CardRowVariations';
import {CarouselRenderInfo} from '@amazon-devices/vega-carousel';

// Carousel (vega-carousel) calls getItemKey with a single CarouselRenderInfo.
export const cardKeyExtractor = (info: CarouselRenderInfo<CardData>) => {
  return `${info.item.cardType} CARD-${info.index} [${info.item.dataIndex}]`;
};

export const rowKeyExtractor = (info: CarouselRenderInfo<RowData>) => {
  return `${info.item.cardType} ROW-${info.index}`;
};

export const buildCardRenderer = ({onFocus}: Partial<CardProps>) => {
  const renderCard = ({item}: {item: CardData; index: number}) => {
    const Card = CARD_VARIATIONS[item.cardType];
    return <Card data={item} onFocus={onFocus} />;
  };
  return renderCard;
};

export const buildRowRenderer = () => {
  const renderRow = ({item}: {item: RowData; index: number}) => {
    const CardRow = CARD_ROW_VARIATIONS[item.cardType];
    return <CardRow rowIndex={item.rowIndex} />;
  };
  return renderRow;
};

export const checkIfCardRowDataSame = (
  prevProps: CardRowProps,
  nextProps: CardRowProps,
) => {
  return prevProps.rowIndex === nextProps.rowIndex;
};
