import React, {memo} from 'react';
import {ROW_DATA} from '../../data';
import {
  Carousel,
  CarouselRenderInfo,
  CarouselDataError,
  CarouselSelectionChangeEvent,
  ShiftFactor,
  CarouselItemDataAdapter,
  CarouselItemStyleProps,
  AnimationDurationProps,
} from '@amazon-devices/vega-carousel';
import {SCREEN_DIMENSION} from '../../constants';
import {RowData} from '../../types';
import {buildRowRenderer, rowKeyExtractor} from '../../utils/listUtils';
import {store} from '../../store';
import {Provider} from 'react-redux';
import {scaleUxToDp} from '../../utils/PixelUtils';

// The grid renders a fixed module-level dataset (ROW_DATA), so its renderer and
// data adapter can live at module scope rather than being memoized per instance.
const renderRow = buildRowRenderer();

const notifyDataError = (_error: CarouselDataError): boolean => false; // Don't retry

const dataAdapter: CarouselItemDataAdapter<RowData, string> = {
  getItem: (index: number) =>
    index >= 0 && index < ROW_DATA.length ? ROW_DATA[index] : undefined,
  getItemCount: () => ROW_DATA.length,
  getItemKey: rowKeyExtractor,
  notifyDataError,
};

const getSelectedItemOffset = (
  _info: CarouselRenderInfo,
): ShiftFactor | undefined => undefined; // Use the default offset.

const onSelectionChanged = (event: CarouselSelectionChangeEvent): void => {
  if (__DEV__) {
    console.info('Selection changed:', event);
  }
};

const CONTAINER_STYLE = {
  height: SCREEN_DIMENSION.height,
  width: SCREEN_DIMENSION.width,
};

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: scaleUxToDp(20),
  itemPaddingOnSelection: scaleUxToDp(20),
  pressedItemScaleFactor: 1,
  selectedItemScaleFactor: 1,
  getSelectedItemOffset,
};

const ANIMATION_DURATION: AnimationDurationProps = {
  itemPressedDuration: 0.15,
  itemScrollDuration: 0.2,
  containerSelectionChangeDuration: 0.25,
};

export const CarouselGrid = memo(
  () => {
    return (
      <Provider store={store}>
        <Carousel
          dataAdapter={dataAdapter}
          renderItem={renderRow}
          testID="vertical-carousel-grid"
          uniqueId="vertical-carousel-grid-main"
          orientation={'vertical'}
          renderedItemsCount={8}
          numOffsetItems={2}
          navigableScrollAreaMargin={0}
          hasPreferredFocus={false}
          initialStartIndex={0}
          hideItemsBeforeSelection={false}
          trapSelectionOnOrientation={false}
          containerStyle={CONTAINER_STYLE}
          itemStyle={ITEM_STYLE}
          animationDuration={ANIMATION_DURATION}
          selectionStrategy="anchored"
          pinnedSelectedItemOffset="0%"
          onSelectionChanged={onSelectionChanged}
        />
      </Provider>
    );
  },
  () => true,
);
