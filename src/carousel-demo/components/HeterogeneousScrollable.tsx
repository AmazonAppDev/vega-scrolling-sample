import {Image, Pressable, View} from 'react-native';
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
import {useCallback, useMemo, useState} from 'react';
import React from 'react';
import {ItemType, ScrollableProps} from '../Types';
import {CAROUSEL_STYLE} from './Style';

// Defined at module scope so they are stable component types across renders.
// These retain focus state because it drives the itemFocusContainer style.
function ItemViewType1({item}: CarouselRenderInfo<ItemType>) {
  const [focus, setFocus] = useState<boolean>(false);
  const onFocusHandler = useCallback(() => setFocus(true), []);
  const onBlurHandler = useCallback(() => setFocus(false), []);

  return (
    <Pressable
      style={[
        CAROUSEL_STYLE.itemContainerType1,
        focus && CAROUSEL_STYLE.itemFocusContainer,
      ]}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}>
      <Image style={CAROUSEL_STYLE.imageContainer} source={item.url} />
    </Pressable>
  );
}

function ItemViewType2({item}: CarouselRenderInfo<ItemType>) {
  const [focus, setFocus] = useState<boolean>(false);
  const onFocusHandler = useCallback(() => setFocus(true), []);
  const onBlurHandler = useCallback(() => setFocus(false), []);

  return (
    <Pressable
      style={[
        CAROUSEL_STYLE.itemContainerType2,
        focus && CAROUSEL_STYLE.itemFocusContainer,
      ]}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}>
      <Image
        style={CAROUSEL_STYLE.imageContainer}
        resizeMode="cover"
        source={item.url}
      />
    </Pressable>
  );
}

const renderItemHandler = ({item, index}: CarouselRenderInfo<ItemType>) =>
  index % 2 === 0 ? (
    <ItemViewType1 index={index} item={item} />
  ) : (
    <ItemViewType2 index={index} item={item} />
  );

const keyProviderHandler = (info: CarouselRenderInfo) =>
  `${info.index}-${info.item.url}`;

const notifyDataError = (_error: CarouselDataError): boolean => false; // Don't retry

const onSelectionChanged = (event: CarouselSelectionChangeEvent): void => {
  if (__DEV__) {
    console.info('Selection changed:', event);
  }
};

const SELECTED_ITEM_SCALE_FACTOR = 1.1;
const getSelectedItemOffset = (_info: CarouselRenderInfo): ShiftFactor => ({
  width: SELECTED_ITEM_SCALE_FACTOR,
  height: SELECTED_ITEM_SCALE_FACTOR,
});

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: 20,
  itemPaddingOnSelection: 20,
  pressedItemScaleFactor: 0.9,
  selectedItemScaleFactor: SELECTED_ITEM_SCALE_FACTOR,
  getSelectedItemOffset,
};

const ANIMATION_DURATION: AnimationDurationProps = {
  itemPressedDuration: 0.15,
  itemScrollDuration: 0.2,
  containerSelectionChangeDuration: 0.25,
};

const SELECTION_BORDER: SelectionBorderProps = {
  borderStrategy: 'inset',
  borderColor: 'white',
  borderWidth: 2,
  borderRadius: 4,
  borderStrokeRadius: 2,
  borderStrokeColor: 'black',
  borderStrokeWidth: 1,
};

/**
 * HeterogeneousItemViewScrollable showcases the Carousel's ability to have
 * different UI Item on a single scrollable row.
 * @param data - Data source
 * @returns HeterogeneousItemViewScrollable
 */
export const HeterogeneousItemViewScrollable = ({data}: ScrollableProps) => {
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
        dataAdapter={dataAdapter}
        renderItem={renderItemHandler}
        testID="heterogeneous-carousel"
        uniqueId="heterogeneous-carousel-unique"
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
        selectionStrategy="anchored"
        pinnedSelectedItemOffset="start"
        onSelectionChanged={onSelectionChanged}
        selectionBorder={SELECTION_BORDER}
      />
    </View>
  );
};
