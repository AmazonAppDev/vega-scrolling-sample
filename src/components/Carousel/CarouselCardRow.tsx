import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { Carousel } from '@amazon-devices/kepler-ui-components';

import { CardTitle, CARD_VARIATIONS } from "../Card";
import { CARD_CONFIG, FEATURES_CONFIG, ROW_CONFIG } from '../../config';
import { ROW_DATA } from '../../data';
import { useDispatch, useSelector } from '../../store';
import { fetchMoreCards } from '../../thunks/paginationThunks';
import { CardData, CardRowProps } from '../../types';
import {
  buildCardRenderer,
  cardKeyExtractor,
  checkIfCardRowDataSame,
} from '../../utils';

const CAROUSEL_ITEM_DIMENSIONS = [
  {
    view: CARD_VARIATIONS.HERO,
    dimension: {
      width: ROW_CONFIG.HERO.WIDTH,
      height: CARD_CONFIG.HERO.CARD.HEIGHT,
    },
  },
  {
    view: CARD_VARIATIONS.VERTICAL,
    dimension: {
      width: ROW_CONFIG.VERTICAL.WIDTH,
      height: CARD_CONFIG.VERTICAL.CARD.HEIGHT,
    },
  },
  {
    view: CARD_VARIATIONS.REGULAR,
    dimension: {
      width: ROW_CONFIG.REGULAR.WIDTH,
      height: CARD_CONFIG.REGULAR.CARD.HEIGHT,
    },
  },
];

export const CarouselCardRow = memo(({ rowIndex }: CardRowProps) => {
  // See docs on pagination for details on Redux, selectors, and the role of onFocusUpdate
  const row = useSelector(({ rows }) => rows[rowIndex]);
  const cards = row.data || [];
  const dispatch = useDispatch();
  const paginationBatchSize = ROW_CONFIG[row.cardType].API_PAGE_SIZE;

  const onFocusUpdate = useCallback((cardData: CardData) => {
        console.log(
          `[API Carousel] Focused on card ${cardData.index} in row ${rowIndex}.`,
        );
        
        if (FEATURES_CONFIG.API_PAGINATION) {
          dispatch(
            fetchMoreCards(
              cardData,
              paginationBatchSize,
              rowIndex
            )
          );
        }
  
      }, [dispatch, paginationBatchSize, rowIndex]);

  const renderCard = buildCardRenderer({ onFocus: onFocusUpdate })

  const getItemForIndex = useCallback(
    () => CARD_VARIATIONS[row.cardType],
    [row.cardType],
  );

  console.log(`[API Carousel] Rendering row ${rowIndex} with ${cards.length} cards.`);

  return (
    <View style={{ height: ROW_CONFIG[row.cardType].HEIGHT }}>
      <CardTitle cardType={row.cardType} title={row.title} />
      <Carousel
        orientation="horizontal"
        focusIndicatorType="pinned"
        pinnedFocusOffset="50%"
        rowId={row.rowIndex}
        data={cards}
        keyProvider={cardKeyExtractor}
        renderItem={renderCard}
        itemDimensions={CAROUSEL_ITEM_DIMENSIONS}
        getItemForIndex={getItemForIndex}
        maxToRenderPerBatch={12}
      />
    </View>
  );
}, checkIfCardRowDataSame);
