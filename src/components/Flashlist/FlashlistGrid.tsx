import React, {memo, useCallback, useRef} from 'react';
import {ROW_DATA} from '../../data';
import {FlashList} from '@amazon-devices/shopify__flash-list';
import {RowData} from '../../types';
import {ROW_CONFIG} from '../../config';
import {SCREEN_DIMENSION} from '../../constants';
import {flashlistRowKeyExtractor} from '../../utils/listUtils';
import {CARD_ROW_VARIATIONS} from '../CardRowVariations';
import {View} from 'react-native';
import {
  findNodeHandle,
  FocusManager,
} from '@amazon-devices/react-native-kepler';
import {Provider} from 'react-redux';
import {store} from '../../store';

const AVG_ROW_HEIGHT =
  (ROW_CONFIG.HERO.HEIGHT +
    ROW_CONFIG.REGULAR.HEIGHT +
    ROW_CONFIG.VERTICAL.HEIGHT) /
  3;

export const FlashlistGrid = memo(
  () => {
    const verticalRef = useRef<FlashList<RowData>>(null);
    const initialFocusRef = useRef<View | null>(null);
    const setRefForFocusedCard = useCallback((element: View) => {
      if (element && initialFocusRef.current === null) {
        initialFocusRef.current = element;
        console.log('Triggering initial focus on first Card');
        FocusManager.focus(findNodeHandle(initialFocusRef?.current));
      }
    }, []);

    const scrollVertically = useCallback((rowIndex: number) => {
      if (verticalRef.current) {
        verticalRef?.current?.scrollToIndex({
          animated: true,
          index: rowIndex,
          viewPosition: 1,
        });
      }
    }, []);

    const overrideItemLayout = useCallback(
      (
        layout: {
          span?: number;
          size?: number;
        },
        item: RowData,
      ) => {
        layout.size = ROW_CONFIG[item.cardType].HEIGHT;
      },
      [],
    );

    const getItemType = useCallback((item: RowData) => {
      return item.cardType;
    }, []);

    const renderRow = useCallback(
      ({item, index}: {item: RowData; index: number}) => {
        const CardRow = CARD_ROW_VARIATIONS[item.cardType];
        return (
          <CardRow
            rowIndex={item.rowIndex}
            scrollVertically={scrollVertically}
            setRefForFocusedCard={
              index === 0 ? setRefForFocusedCard : undefined
            }
          />
        );
      },
      [scrollVertically, setRefForFocusedCard],
    );

    return (
      <Provider store={store}>
        <FlashList
          ref={verticalRef}
          data={ROW_DATA}
          renderItem={renderRow}
          keyExtractor={flashlistRowKeyExtractor}
          estimatedItemSize={AVG_ROW_HEIGHT}
          overrideItemLayout={overrideItemLayout}
          getItemType={getItemType}
          drawDistance={SCREEN_DIMENSION.height}
          scrollEnabled={false}
          removeClippedSubviews={true}
        />
      </Provider>
    );
  },
  () => {
    return true;
  },
);
