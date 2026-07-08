import React, {useCallback, useMemo} from 'react';
import {Image, Pressable, View} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
  CarouselDataError,
  CarouselSelectionChangeEvent,
  ShiftFactor,
  CarouselItemStyleProps,
  AnimationDurationProps,
  SelectionBorderProps,
} from '@amazon-devices/vega-carousel';
import {Ref, forwardRef, useImperativeHandle, useRef} from 'react';

import {ItemType, ScrollableProps} from '../Types';
import {CAROUSEL_STYLE} from './Style';

// Module scope so ItemView is a stable component type; defining it inside the
// parent would remount every item on each render.
function ItemView({item}: CarouselRenderInfo<ItemType>) {
  return (
    <Pressable style={[CAROUSEL_STYLE.itemHorizontalContainer]}>
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

const FOCUSED_ITEM_SCALE_FACTOR = 1.1;
const getSelectedItemOffset = (_info: CarouselRenderInfo): ShiftFactor => ({
  width: FOCUSED_ITEM_SCALE_FACTOR,
  height: FOCUSED_ITEM_SCALE_FACTOR,
});

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: 10,
  itemPaddingOnSelection: 10,
  pressedItemScaleFactor: 0.9,
  selectedItemScaleFactor: FOCUSED_ITEM_SCALE_FACTOR,
  getSelectedItemOffset,
};

const ANIMATION_DURATION: AnimationDurationProps = {
  itemPressedDuration: 0.15,
  itemScrollDuration: 0.2,
  containerSelectionChangeDuration: 0.25,
};

const SELECTION_BORDER: SelectionBorderProps = {
  borderStrategy: 'outset',
};

/**
 * A Horizontal scrollable is a wrapper around the Carousel component. It
 * maintains the same functionality as the Carousel but orients it to display
 * items in a horizontal direction.
 * @param data - Data source
 * @param ref - reference to access Imperative handler methods
 * @returns HorizontalScrollable
 */
export const HorizontalScrollable = forwardRef(
  (
    {data, selectionStrategy = 'natural'}: ScrollableProps,
    ref?: Ref<CarouselRef<any>>,
  ) => {
    const scrollableRef = useRef<CarouselRef<any>>(null);

    useImperativeHandle(ref, () => scrollableRef.current!, []);

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
      <View style={CAROUSEL_STYLE.container}>
        <Carousel
          ref={scrollableRef}
          dataAdapter={dataAdapter}
          renderItem={renderItemHandler}
          testID="horizontal-carousel"
          uniqueId="horizontal-carousel-unique"
          orientation={'horizontal'}
          renderedItemsCount={12}
          numOffsetItems={2}
          navigableScrollAreaMargin={100}
          hasPreferredFocus={true}
          initialStartIndex={0}
          hideItemsBeforeSelection={false}
          trapSelectionOnOrientation={false}
          containerStyle={CAROUSEL_STYLE.horizontalCarouselContainerStyle}
          itemStyle={ITEM_STYLE}
          animationDuration={ANIMATION_DURATION}
          selectionStrategy={selectionStrategy}
          pinnedSelectedItemOffset="start"
          onSelectionChanged={onSelectionChanged}
          selectionBorder={SELECTION_BORDER}
        />
      </View>
    );
  },
);
