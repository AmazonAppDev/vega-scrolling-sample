import React, {memo} from 'react';
import {CardRowProps, CardType} from '../types';

import {checkIfCardRowDataSame} from '../utils/listUtils';
import {CardRow} from '../config';

export const HeroCardRow = memo(
  ({rowIndex, scrollVertically, setRefForFocusedCard}: CardRowProps) => {
    return (
      <CardRow
        rowIndex={rowIndex}
        scrollVertically={scrollVertically}
        setRefForFocusedCard={setRefForFocusedCard}
      />
    );
  },
  checkIfCardRowDataSame,
);

export const VerticalCardRow = memo(
  ({rowIndex, scrollVertically, setRefForFocusedCard}: CardRowProps) => {
    return (
      <CardRow
        rowIndex={rowIndex}
        scrollVertically={scrollVertically}
        setRefForFocusedCard={setRefForFocusedCard}
      />
    );
  },
  checkIfCardRowDataSame,
);

export const RegularCardRow = memo(
  ({rowIndex, scrollVertically, setRefForFocusedCard}: CardRowProps) => {
    return (
      <CardRow
        rowIndex={rowIndex}
        scrollVertically={scrollVertically}
        setRefForFocusedCard={setRefForFocusedCard}
      />
    );
  },
  checkIfCardRowDataSame,
);

export const CARD_ROW_VARIATIONS: Record<
  CardType,
  React.MemoExoticComponent<
    ({
      rowIndex,
      scrollVertically,
      setRefForFocusedCard,
    }: CardRowProps) => React.JSX.Element
  >
> = {
  HERO: HeroCardRow,
  VERTICAL: VerticalCardRow,
  REGULAR: RegularCardRow,
};
