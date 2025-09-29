import React, {memo} from 'react';
import {CardProps, CardType} from '../../types';
import {Card} from './Card';
import {DEFAULT_IMAGE_RESOLUTION} from '../../constants';

const checkIfDataSame = (
  prevProps: Omit<CardProps, 'cardType'>,
  nextProps: Omit<CardProps, 'cardType'>,
) => {
  const dataSame =
    prevProps.data.imageUrl ===
      nextProps.data.imageUrl &&
    prevProps.data.index === nextProps.data.index &&
    prevProps.data.rowIndex === nextProps.data.rowIndex;
  return dataSame;
};

export const HeroCard = memo(
  ({data, scroll, setRefForFocusedCard, onFocus}: Omit<CardProps, 'cardType'>) => {
    return (
      <Card
        cardType="HERO"
        data={data}
        scroll={scroll}
        setRefForFocusedCard={setRefForFocusedCard}
        onFocus={onFocus}
      />
    );
  },
  checkIfDataSame,
);

export const VerticalCard = memo(
  ({data, scroll, setRefForFocusedCard, onFocus}: Omit<CardProps, 'cardType'>) => {
    return (
      <Card
        cardType="VERTICAL"
        data={data}
        scroll={scroll}
        setRefForFocusedCard={setRefForFocusedCard}
        onFocus={onFocus}
      />
    );
  },
  checkIfDataSame,
);

export const RegularCard = memo(
  ({data, scroll, setRefForFocusedCard, onFocus}: Omit<CardProps, 'cardType'>) => {
    return (
      <Card
        cardType="REGULAR"
        data={data}
        scroll={scroll}
        setRefForFocusedCard={setRefForFocusedCard}
        onFocus={onFocus}
      />
    );
  },
  checkIfDataSame,
);

export const CARD_VARIATIONS: Record<
  CardType,
  React.MemoExoticComponent<
    ({
      data,
      scroll,
      setRefForFocusedCard,
      onFocus
    }: Omit<CardProps, 'cardType'>) => React.JSX.Element
  >
> = {
  HERO: HeroCard,
  VERTICAL: VerticalCard,
  REGULAR: RegularCard,
};
