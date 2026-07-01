import React, {memo, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {CardRowProps, CardData} from '../../types';
import {CARD_CONFIG} from '../../config/layout/cardConfig';
import {ROW_CONFIG, FEATURES_CONFIG} from '../../config';

import {
  Carousel,
  CarouselRenderInfo,
  CarouselDataError,
  CarouselSelectionChangeEvent,
  ShiftFactor,
  CarouselItemStyleProps,
  AnimationDurationProps,
  SelectionBorderProps,
} from '@amazon-devices/vega-carousel';
import {CardTitle} from '../CardTitle';
import {useDispatch, useSelector} from '../../store';
import {fetchMoreCards} from '../../thunks/paginationThunks';

import {
  buildCardRenderer,
  cardKeyExtractor,
  checkIfCardRowDataSame,
} from '../../utils/listUtils';

// Module-scope handlers/objects: stable references shared across all rows.
const notifyDataError = (_error: CarouselDataError): boolean => false; // Don't retry

const getSelectedItemOffset = (
  _info: CarouselRenderInfo,
): ShiftFactor | undefined => undefined; // Use the default offset.

const onSelectionChanged = (event: CarouselSelectionChangeEvent): void => {
  if (__DEV__) {
    console.info('Selection changed:', event);
  }
};

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: 20,
  itemPaddingOnSelection: 20,
  pressedItemScaleFactor: 0.8,
  selectedItemScaleFactor: 1,
  getSelectedItemOffset,
};

const ANIMATION_DURATION: AnimationDurationProps = {
  itemPressedDuration: 0.15,
  itemScrollDuration: 0.2,
  containerSelectionChangeDuration: 0.25,
};

export const CarouselCardRow = memo(({rowIndex}: CardRowProps) => {
  const row = useSelector(({rows}) => rows[rowIndex]);
  const cards = useMemo(() => row.data || [], [row.data]);
  const dispatch = useDispatch();
  const paginationBatchSize = ROW_CONFIG[row.cardType].API_PAGE_SIZE;

  const onFocusUpdate = useCallback(
    (cardData: CardData) => {
      if (FEATURES_CONFIG.API_PAGINATION) {
        dispatch(fetchMoreCards(cardData, paginationBatchSize, rowIndex));
      }
    },
    [dispatch, paginationBatchSize, rowIndex],
  );

  const renderCard = useMemo(
    () => buildCardRenderer({onFocus: onFocusUpdate}),
    [onFocusUpdate],
  );

  const getItemCount = useCallback(() => cards.length, [cards]);

  const getItem = useCallback(
    (index: number) =>
      index >= 0 && index < cards.length ? cards[index] : undefined,
    [cards],
  );

  const dataAdapter = useMemo(
    () => ({
      getItem,
      getItemCount,
      getItemKey: cardKeyExtractor,
      notifyDataError,
    }),
    [getItem, getItemCount],
  );

  const selectionBorder = useMemo<SelectionBorderProps>(
    () => ({
      borderStrategy: 'outset',
      borderRadius: CARD_CONFIG[row.cardType].CARD.BORDER_RADIUS,
      borderStrokeRadius: CARD_CONFIG[row.cardType].CARD.BORDER_RADIUS,
    }),
    [row.cardType],
  );

  return (
    <View style={{height: ROW_CONFIG[row.cardType].HEIGHT}}>
      <CardTitle cardType={row.cardType} title={row.title} />
      <Carousel
        dataAdapter={dataAdapter}
        renderItem={renderCard}
        testID={`horizontal-carousel-row-${rowIndex}`}
        uniqueId={`horizontal-carousel-row-${rowIndex}`}
        orientation="horizontal"
        renderedItemsCount={8}
        numOffsetItems={2}
        navigableScrollAreaMargin={0}
        hasPreferredFocus={false}
        initialStartIndex={0}
        hideItemsBeforeSelection={false}
        trapSelectionOnOrientation={false}
        itemStyle={ITEM_STYLE}
        animationDuration={ANIMATION_DURATION}
        selectionStrategy="pinned"
        pinnedSelectedItemOffset="50%"
        onSelectionChanged={onSelectionChanged}
        selectionBorder={selectionBorder}
      />
    </View>
  );
}, checkIfCardRowDataSame);
