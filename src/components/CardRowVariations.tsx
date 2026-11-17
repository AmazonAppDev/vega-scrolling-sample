import React, {memo} from 'react';
import {CardRowProps, CardType} from '../types';

import {checkIfCardRowDataSame} from '../utils/listUtils';
import {CardRow} from '../config';

export const HeroCardRow = memo(({rowIndex}: CardRowProps) => {
  return <CardRow rowIndex={rowIndex} />;
}, checkIfCardRowDataSame);

export const VerticalCardRow = memo(({rowIndex}: CardRowProps) => {
  return <CardRow rowIndex={rowIndex} />;
}, checkIfCardRowDataSame);

export const RegularCardRow = memo(({rowIndex}: CardRowProps) => {
  return <CardRow rowIndex={rowIndex} />;
}, checkIfCardRowDataSame);

export const CARD_ROW_VARIATIONS: Record<
  CardType,
  React.MemoExoticComponent<({rowIndex}: CardRowProps) => React.JSX.Element>
> = {
  HERO: HeroCardRow,
  VERTICAL: VerticalCardRow,
  REGULAR: RegularCardRow,
};
