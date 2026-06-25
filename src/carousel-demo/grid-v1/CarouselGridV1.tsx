/*
 * V1 counterpart of the base app's CarouselGrid (the vertical grid of rows),
 * built on the V1 Carousel (@amazon-devices/kepler-ui-components). Mirrors the
 * V2 grid's nested structure (vertical carousel of horizontal CardRows) on the
 * V1 API, reusing the app's ROW_DATA / config / store.
 */
import React, {memo} from 'react';
import {Provider} from 'react-redux';
import {
  Carousel,
  CarouselRenderInfo,
  ItemInfo,
} from '@amazon-devices/kepler-ui-components';
import {CardType, RowData} from '../../types';
import {ROW_CONFIG} from '../../config';
import {PAGE_PADDING, SCREEN_DIMENSION} from '../../constants';
import {ROW_DATA} from '../../data';
import {store} from '../../store';
import {CarouselCardRowV1} from './CarouselCardRowV1';

// One distinct RowView per card type. V1 maps an item to its dimension by the
// view's identity, so each card type must have its own view component for the
// per-type row HEIGHT to apply (otherwise every row reserves a single height
// and short rows get large gaps).
const makeRowView = (): React.FC<CarouselRenderInfo<RowData>> => {
  const RowView: React.FC<CarouselRenderInfo<RowData>> = ({item}) => (
    <CarouselCardRowV1 rowIndex={item.rowIndex} />
  );
  return RowView;
};

const ROW_VIEWS: Record<CardType, React.FC<CarouselRenderInfo<RowData>>> = {
  HERO: makeRowView(),
  VERTICAL: makeRowView(),
  REGULAR: makeRowView(),
};

const ROW_DIMENSIONS: ItemInfo[] = (
  ['HERO', 'VERTICAL', 'REGULAR'] as const
).map((cardType) => ({
  view: ROW_VIEWS[cardType],
  dimension: {
    width: SCREEN_DIMENSION.width - PAGE_PADDING,
    height: ROW_CONFIG[cardType].HEIGHT,
  },
}));

export const CarouselGridV1 = memo(() => {
  return (
    <Provider store={store}>
      <Carousel
        data={ROW_DATA}
        getItemForIndex={(index: number) => ROW_VIEWS[ROW_DATA[index].cardType]}
        keyProvider={(_d: RowData, index: number) => `v1-row-${index}`}
        itemDimensions={ROW_DIMENSIONS}
        renderItem={(info: CarouselRenderInfo<RowData>) => {
          const RowView = ROW_VIEWS[info.item.cardType];
          return <RowView {...info} />;
        }}
        testID="v1-vertical-carousel-grid"
        orientation={'vertical'}
        maxToRenderPerBatch={8}
        numOffsetItems={2}
        containerStyle={{
          height: SCREEN_DIMENSION.height,
          width: SCREEN_DIMENSION.width,
        }}
        itemPadding={20}
        itemScrollDelay={0.2}
        focusIndicatorType="fixed"
      />
    </Provider>
  );
});
