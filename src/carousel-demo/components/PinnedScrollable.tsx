/*
 * Pinned offset demo: each row uses a different pinnedSelectedItemOffset
 * (0% through 100%). No navigableScrollAreaMargin, so pin points are
 * relative to the full viewport.
 */
import React, {useCallback, useMemo} from 'react';
import {Image, Pressable, View, Text, StyleSheet} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
  CarouselItemStyleProps,
  AnimationDurationProps,
  SelectionBorderProps,
} from '@amazon-devices/vega-carousel';
import {Ref, forwardRef, useImperativeHandle, useRef} from 'react';
import {ItemType, ScrollableProps} from '../Types';

type PinOffset = `${number}%`;

const PIN_OFFSETS: PinOffset[] = [
  '0%',
  '5%',
  '11%',
  '15%',
  '25%',
  '50%',
  '70%',
  '89%',
  '100%',
];

type SwimlaneData = {pinOffset: PinOffset; items: ItemType[]};

// Render-independent handlers/objects are defined once at module scope so they
// keep a stable reference across renders — no per-render allocations and stable
// <Carousel> prop identity (better for performance and concurrent-rendering
// safety). Data-dependent adapters are memoized per component instance below.
const notifyDataError = (): boolean => false; // Don't retry

const swimlaneKeyProvider = (info: CarouselRenderInfo) =>
  `${info.index}-${info.item.url}`;

const renderPoster = ({item}: CarouselRenderInfo<ItemType>) => (
  <Pressable style={styles.poster}>
    <Image style={styles.posterImage} source={item.url} />
  </Pressable>
);

const SWIMLANE_ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: 20,
  itemPaddingOnSelection: 20,
  selectedItemScaleFactor: 1.0,
  pressedItemScaleFactor: 1.0,
};

const SWIMLANE_ANIMATION_DURATION: AnimationDurationProps = {
  itemScrollDuration: 0.2,
};

const SWIMLANE_SELECTION_BORDER: SelectionBorderProps = {
  borderStrategy: 'outset',
  borderColor: '#00FF00',
  borderWidth: 3,
  borderRadius: 8,
};

const outerKeyProvider = (info: CarouselRenderInfo) => `swimlane-${info.index}`;

const renderSwimlane = ({item}: CarouselRenderInfo<SwimlaneData>) => (
  <Swimlane swimlane={item} />
);

const OUTER_ITEM_STYLE: CarouselItemStyleProps = {itemPadding: 0};

const OUTER_ANIMATION_DURATION: AnimationDurationProps = {
  itemScrollDuration: 0.4,
};

const Swimlane = ({swimlane}: {swimlane: SwimlaneData}) => {
  const getItem = useCallback(
    (index: number) =>
      index >= 0 && index < swimlane.items.length
        ? swimlane.items[index]
        : undefined,
    [swimlane.items],
  );
  const getItemCount = useCallback(
    () => swimlane.items.length,
    [swimlane.items],
  );

  const dataAdapter = useMemo(
    () => ({
      getItem,
      getItemCount,
      getItemKey: swimlaneKeyProvider,
      notifyDataError,
    }),
    [getItem, getItemCount],
  );

  return (
    <View style={styles.swimlane}>
      <Text style={styles.swimlaneLabel}>pin='{swimlane.pinOffset}'</Text>
      <Carousel
        dataAdapter={dataAdapter}
        renderItem={renderPoster}
        testID={`nomargin-pin-${swimlane.pinOffset}`}
        uniqueId={`nomargin-pin-${swimlane.pinOffset}`}
        orientation={'horizontal'}
        numOffsetItems={1}
        renderedItemsCount={10}
        containerStyle={styles.swimlaneCarousel}
        itemStyle={SWIMLANE_ITEM_STYLE}
        animationDuration={SWIMLANE_ANIMATION_DURATION}
        selectionStrategy="pinned"
        pinnedSelectedItemOffset={swimlane.pinOffset}
        selectionBorder={SWIMLANE_SELECTION_BORDER}
      />
    </View>
  );
};

export const PinnedScrollable = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<any>>) => {
    const scrollableRef = useRef<CarouselRef<any>>(null);

    const swimlanes: SwimlaneData[] = useMemo(
      () => PIN_OFFSETS.map((p) => ({pinOffset: p, items: data})),
      [data],
    );

    useImperativeHandle(ref, () => scrollableRef.current!, []);

    const getItem = useCallback(
      (index: number) =>
        index >= 0 && index < swimlanes.length ? swimlanes[index] : undefined,
      [swimlanes],
    );
    const getItemCount = useCallback(() => swimlanes.length, [swimlanes]);

    const dataAdapter = useMemo(
      () => ({
        getItem,
        getItemCount,
        getItemKey: outerKeyProvider,
        notifyDataError,
      }),
      [getItem, getItemCount],
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Pinned offset: {PIN_OFFSETS.join(', ')}
        </Text>
        <Carousel
          ref={scrollableRef}
          dataAdapter={dataAdapter}
          renderItem={renderSwimlane}
          testID="vertical-nomargin-test"
          uniqueId="vertical-nomargin-test"
          orientation={'vertical'}
          numOffsetItems={1}
          renderedItemsCount={10}
          hasPreferredFocus={true}
          trapSelectionOnOrientation={false}
          containerStyle={styles.outerCarousel}
          itemStyle={OUTER_ITEM_STYLE}
          animationDuration={OUTER_ANIMATION_DURATION}
          selectionStrategy="pinned"
          pinnedSelectedItemOffset={'44%'}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', backgroundColor: '#000'},
  header: {color: 'lime', padding: 5, fontSize: 14},
  outerCarousel: {height: '100%', width: '100%'},
  swimlane: {height: 345, width: '100%', borderWidth: 2, borderColor: 'lime'},
  swimlaneLabel: {color: 'white', marginLeft: 20, marginBottom: 5},
  // Match V1's heights (row 345 / container 310 over the 300px poster) so the
  // gap between the card and the lime row border is consistent across V1 and V2.
  swimlaneCarousel: {width: '100%', height: 310},
  // Poster cell matches the source poster aspect ratio (480x720 = 0.667), so
  // width 200 -> height 300. With this ratio, resizeMode 'cover' fills the cell
  // without cropping the image (and the number baked into the bottom stays
  // visible). The container/row heights above are sized to fit this cell.
  poster: {width: 200, height: 300},
  posterImage: {width: '100%', height: '100%', resizeMode: 'cover'},
});
