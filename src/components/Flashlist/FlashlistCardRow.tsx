import React, {memo, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {FlashList} from '@amazon-devices/shopify__flash-list';
import {CardData, CardRowProps} from '../../types';
import {ROW_CONFIG, FEATURES_CONFIG} from '../../config';
import {
  flashlistCardKeyExtractor,
  checkIfCardRowDataSame,
} from '../../utils/listUtils';
import {CardTitle} from '../CardTitle';
import {CARD_VARIATIONS} from '../CardVariations';
import {useDispatch, useSelector} from '../../store';
import {fetchMoreCards} from '../../thunks/paginationThunks';
import {ROW_DATA} from '../../data';

export const FlashlistCardRow = memo(
  ({rowIndex, scrollVertically, setRefForFocusedCard}: CardRowProps) => {
    const row = useSelector(({rows}) => rows[rowIndex]);
    const cards = row.data || [];
    const dispatch = useDispatch();
    const paginationBatchSize = ROW_CONFIG[row.cardType].API_PAGE_SIZE;

    const horizontalRef = useRef<FlashList<CardData>>(null);
    const scrollHorizontally = useCallback((index: number) => {
      if (horizontalRef.current) {
        horizontalRef?.current?.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        });
      }
    }, []);

    const onFocusUpdate = useCallback(
      (cardData: CardData) => {
        console.log(
          `[API FlashList] Focused on card ${cardData.index} in row ${rowIndex}.`,
        );

        if (FEATURES_CONFIG.API_PAGINATION) {
          dispatch(fetchMoreCards(cardData, paginationBatchSize, rowIndex));
        }
      },
      [dispatch, paginationBatchSize, rowIndex],
    );

    const renderCard = useCallback(
      ({item, index}: {item: CardData; index: number}) => {
        const Card = CARD_VARIATIONS[item.cardType];
        return (
          <Card
            data={item}
            scroll={{
              vertically: scrollVertically,
              horizontally: scrollHorizontally,
            }}
            setRefForFocusedCard={
              index === 0 ? setRefForFocusedCard : undefined
            }
            onFocus={onFocusUpdate}
          />
        );
      },
      [
        scrollVertically,
        scrollHorizontally,
        setRefForFocusedCard,
        onFocusUpdate,
      ],
    );

    // Reset horizontal scroll position only when the row is recycled to a new
    // rowIndex. We intentionally depend on rowIndex alone (not on the card
    // data) so a pagination append does not snap the row back to index 0.
    // FlashList guards scrollToIndex internally when there are no items.
    useEffect(() => {
      horizontalRef.current?.scrollToIndex({
        animated: false,
        index: 0,
        viewPosition: 0,
      });
    }, [rowIndex]);

    console.log(
      `[API FlashList] Rendering row ${rowIndex} with ${cards.length} cards.`,
    );

    return (
      <View style={{height: ROW_CONFIG[row.cardType].HEIGHT}}>
        <CardTitle cardType={row.cardType} title={row.title} />
        <FlashList
          ref={horizontalRef}
          horizontal={true}
          data={
            FEATURES_CONFIG.API_PAGINATION ? cards : ROW_DATA[rowIndex].data
          }
          estimatedItemSize={ROW_CONFIG[row.cardType].WIDTH}
          keyExtractor={flashlistCardKeyExtractor}
          renderItem={renderCard}
          removeClippedSubviews={true}
          scrollEnabled={false}
        />
      </View>
    );
  },
  checkIfCardRowDataSame,
);
