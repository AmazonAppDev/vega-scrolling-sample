import {Image, Pressable} from 'react-native';
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
import {useCallback, useMemo} from 'react';
import React from 'react';
import {ItemType, ScrollableProps} from '../Types';
import {CAROUSEL_STYLE} from './Style';
import {scaleUxToDp} from '../../utils/PixelUtils';

// Module scope so ItemView is a stable component type; defining it inside the
// parent would remount every item on each render.
function ItemView({item}: CarouselRenderInfo<ItemType>) {
  return (
    <Pressable style={[CAROUSEL_STYLE.itemVerticalContainer]}>
      <Image style={CAROUSEL_STYLE.imageContainer} source={item.url} />
    </Pressable>
  );
}

const renderItemHandler = ({item, index}: CarouselRenderInfo<ItemType>) => (
  <ItemView index={index} item={item} />
);

const keyProviderHandler = (info: CarouselRenderInfo) =>
  `${info.index}-${info.item.url}`;

const notifyDataError = (_error: CarouselDataError): boolean => false; // Don't retry

const onSelectionChanged = (event: CarouselSelectionChangeEvent): void => {
  if (__DEV__) {
    console.info('Selection changed:', event);
  }
};

const getSelectedItemOffset = (
  _info: CarouselRenderInfo,
): ShiftFactor | undefined => undefined; // Use the default offset.

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: scaleUxToDp(10),
  itemPaddingOnSelection: scaleUxToDp(20),
  pressedItemScaleFactor: 0.8,
  selectedItemScaleFactor: 1,
  getSelectedItemOffset,
};

const ANIMATION_DURATION: AnimationDurationProps = {
  itemPressedDuration: 0.18,
  itemScrollDuration: 0.2,
  containerSelectionChangeDuration: 0.22,
};

const SELECTION_BORDER: SelectionBorderProps = {
  borderStrategy: 'outset',
  borderColor: '#FFC107',
  borderWidth: scaleUxToDp(5),
  borderRadius: scaleUxToDp(10),
  borderStrokeRadius: scaleUxToDp(5),
  borderStrokeColor: 'yellow',
  borderStrokeWidth: scaleUxToDp(2),
};

/**
 * A vertical scrollable is a wrapper around the Carousel component that
 * allows vertical scrolling. It maintains the same functionality as the
 * Carousel but orients it to display items in a vertical direction.
 * @param data - Data source
 * @returns Vertical Scrollable
 */
export const VerticalScrollable = ({data}: ScrollableProps) => {
  const getItem = useCallback(
    (index: number) =>
      index >= 0 && index < data.length ? data[index] : undefined,
    [data],
  );

  const getItemCount = useCallback(() => data.length, [data]);

  const dataAdapter = useMemo(
    () => ({
      getItem,
      getItemCount,
      getItemKey: keyProviderHandler,
      notifyDataError,
    }),
    [getItem, getItemCount],
  );

  return (
    <Carousel
      dataAdapter={dataAdapter}
      renderItem={renderItemHandler}
      testID="vertical-carousel"
      uniqueId="vertical-carousel-unique"
      orientation={'vertical'}
      renderedItemsCount={11}
      numOffsetItems={2}
      navigableScrollAreaMargin={0}
      hasPreferredFocus={true}
      initialStartIndex={0}
      hideItemsBeforeSelection={false}
      trapSelectionOnOrientation={false}
      containerStyle={CAROUSEL_STYLE.verticalCarouselContainerStyle}
      itemStyle={ITEM_STYLE}
      animationDuration={ANIMATION_DURATION}
      selectionStrategy="anchored"
      pinnedSelectedItemOffset="start"
      onSelectionChanged={onSelectionChanged}
      selectionBorder={SELECTION_BORDER}
    />
  );
};
