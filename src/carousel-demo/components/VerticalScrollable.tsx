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

// Render-independent values live at module scope so they keep a stable
// reference across renders — no per-render allocations and stable <Carousel>
// prop identity (better for performance and concurrent-rendering safety).
// ItemView must be a stable component type; defining it inside the parent
// would remount every item on each render.
function ItemView({item}: CarouselRenderInfo<ItemType>): JSX.Element {
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
  itemPadding: 10,
  itemPaddingOnSelection: 20,
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
  borderColor: 'red',
  borderWidth: 5,
  borderRadius: 10,
  borderStrokeRadius: 5,
  borderStrokeColor: 'yellow',
  borderStrokeWidth: 2,
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
