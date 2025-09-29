import React, {memo, useCallback} from 'react';
import {Provider} from 'react-redux';

import {Carousel} from '@amazon-devices/kepler-ui-components';

import {CARD_ROW_VARIATIONS} from '../Card';
import {ROW_CONFIG} from '../../config';
import {PAGE_PADDING, SCREEN_DIMENSION} from '../../constants';
import {ROW_DATA} from '../../data';
import {store} from '../../store';
import {buildRowRenderer, rowKeyExtractor} from '../../utils';

const CAROUSEL_ITEM_DIMENSIONS = [
  {
    view: CARD_ROW_VARIATIONS.HERO,
    dimension: {
      width: SCREEN_DIMENSION.width - PAGE_PADDING,
      height: ROW_CONFIG.HERO.HEIGHT,
    },
  },
  {
    view: CARD_ROW_VARIATIONS.VERTICAL,
    dimension: {
      width: SCREEN_DIMENSION.width - PAGE_PADDING,
      height: ROW_CONFIG.VERTICAL.HEIGHT,
    },
  },
  {
    view: CARD_ROW_VARIATIONS.REGULAR,
    dimension: {
      width: SCREEN_DIMENSION.width - PAGE_PADDING,
      height: ROW_CONFIG.REGULAR.HEIGHT,
    },
  },
];

export const CarouselGrid = memo(
  () => {
    const renderRow = buildRowRenderer();
    const getItemForIndex = useCallback((index: number) => {
      return CARD_ROW_VARIATIONS[ROW_DATA[index].cardType];
    }, []);

    return (
      <Provider store={store}>
        <Carousel
          containerStyle={{
            height: SCREEN_DIMENSION.height,
            width: SCREEN_DIMENSION.width,
          }}
          orientation={'vertical'}
          focusIndicatorType='natural'
          data={ROW_DATA}
          renderItem={renderRow}
          keyProvider={rowKeyExtractor}
          itemDimensions={CAROUSEL_ITEM_DIMENSIONS}
          getItemForIndex={getItemForIndex}
        />
      </Provider>
    );
  },
  () => {
    return true;
  },
);
