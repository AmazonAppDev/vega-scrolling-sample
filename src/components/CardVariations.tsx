import React, {memo} from 'react';
import {CardProps, CardType} from '../types';
import {Card, isSameCardData} from './Card';

type WrapperProps = Omit<CardProps, 'cardType'>;
// Each wrapper compares the image URL at the resolution its card renders.
const sameDataFor =
  (cardType: CardType) => (prev: WrapperProps, next: WrapperProps) =>
    isSameCardData(cardType, prev.data, next.data);

export const HeroCard = memo(({data, onFocus}: Omit<CardProps, 'cardType'>) => {
  return <Card cardType="HERO" data={data} onFocus={onFocus} />;
}, sameDataFor('HERO'));

export const VerticalCard = memo(
  ({data, onFocus}: Omit<CardProps, 'cardType'>) => {
    return <Card cardType="VERTICAL" data={data} onFocus={onFocus} />;
  },
  sameDataFor('VERTICAL'),
);

export const RegularCard = memo(
  ({data, onFocus}: Omit<CardProps, 'cardType'>) => {
    return <Card cardType="REGULAR" data={data} onFocus={onFocus} />;
  },
  sameDataFor('REGULAR'),
);

export const CARD_VARIATIONS: Record<
  CardType,
  React.MemoExoticComponent<
    ({data, onFocus}: Omit<CardProps, 'cardType'>) => React.JSX.Element
  >
> = {
  HERO: HeroCard,
  VERTICAL: VerticalCard,
  REGULAR: RegularCard,
};
