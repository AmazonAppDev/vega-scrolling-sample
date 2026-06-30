/*
 * Pinned offset demo (V1 Carousel from @amazon-devices/kepler-ui-components).
 *
 * V1 counterpart of PinnedScrollable.tsx: each horizontal row uses a different
 * pinnedFocusOffset (0% through 100%) so V1 vs V2 pinned positioning can be
 * compared, including the boundary cases (0%, 100%, short rows).
 *
 * V1 prop mapping vs V2 (vega-carousel):
 *   selectionStrategy="pinned"  -> focusIndicatorType="pinned"
 *   pinnedSelectedItemOffset    -> pinnedFocusOffset
 *   hasPreferredFocus           -> hasTVPreferredFocus
 *   animationDuration           -> itemScrollDelay
 *   dataAdapter{...}            -> data[] + getItemForIndex + keyProvider + itemDimensions
 */
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {Image, Pressable, View, Text, StyleSheet} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
  ItemInfo,
} from '@amazon-devices/kepler-ui-components';
import {ItemType, ScrollableProps} from '../Types';
import {SCREEN_DIMENSION} from '../../constants';

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

const SIDEBAR_WIDTH = 150;
const CONTENT_WIDTH = SCREEN_DIMENSION.width - SIDEBAR_WIDTH;

type SwimlaneData = {pinOffset: PinOffset; items: ItemType[]};

const PosterView: React.FC<CarouselRenderInfo<ItemType>> = ({item}) => (
  <Pressable style={styles.poster}>
    <Image style={styles.posterImage} source={item.url} />
  </Pressable>
);

// Match the source poster aspect ratio (480x720 = 0.667): width 200 -> 300.
const POSTER_DIMENSIONS: ItemInfo[] = [
  {view: PosterView, dimension: {width: 200, height: 300}},
];

const SWIMLANE_SELECTION_BORDER = {
  enabled: true,
  borderColor: '#00FF00',
  borderWidth: 3,
  borderRadius: 8,
};

const Swimlane = ({swimlane}: {swimlane: SwimlaneData}) => (
  <View style={styles.swimlane}>
    <Text style={styles.swimlaneLabel}>pin='{swimlane.pinOffset}'</Text>
    <Carousel
      data={swimlane.items}
      getItemForIndex={() => PosterView}
      keyProvider={(_d: ItemType, index: number) => `${index}`}
      itemDimensions={POSTER_DIMENSIONS}
      renderItem={(info: CarouselRenderInfo<ItemType>) => (
        <PosterView {...info} />
      )}
      testID={`v1-pin-${swimlane.pinOffset}`}
      orientation={'horizontal'}
      numOffsetItems={1}
      maxToRenderPerBatch={10}
      containerStyle={styles.swimlaneCarousel}
      itemPadding={20}
      itemScrollDelay={0.2}
      focusIndicatorType="pinned"
      pinnedFocusOffset={swimlane.pinOffset}
      selectionBorder={SWIMLANE_SELECTION_BORDER}
      selectionBorderStrategy="outset"
    />
  </View>
);

const SwimlaneView: React.FC<CarouselRenderInfo<SwimlaneData>> = ({item}) => (
  <Swimlane swimlane={item} />
);

const ROW_DIMENSIONS: ItemInfo[] = [
  {view: SwimlaneView, dimension: {width: CONTENT_WIDTH, height: 345}},
];

export const PinnedScrollableV1 = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<string>>) => {
    const scrollableRef = useRef<CarouselRef<string>>(null);
    const swimlanes: SwimlaneData[] = useMemo(
      () => PIN_OFFSETS.map((p) => ({pinOffset: p, items: data})),
      [data],
    );

    useImperativeHandle(ref, () => scrollableRef.current!, []);

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Pinned offset (V1): {PIN_OFFSETS.join(', ')}
        </Text>
        <Carousel
          ref={scrollableRef}
          data={swimlanes}
          getItemForIndex={() => SwimlaneView}
          keyProvider={(_d: SwimlaneData, index: number) => `swimlane-${index}`}
          itemDimensions={ROW_DIMENSIONS}
          renderItem={(info: CarouselRenderInfo<SwimlaneData>) => (
            <SwimlaneView {...info} />
          )}
          testID="v1-vertical-pinned"
          orientation={'vertical'}
          numOffsetItems={1}
          maxToRenderPerBatch={10}
          hasTVPreferredFocus={true}
          trapFocusOnAxis={false}
          containerStyle={styles.outerCarousel}
          itemPadding={0}
          itemScrollDelay={0.4}
          focusIndicatorType="pinned"
          pinnedFocusOffset={'44%'}
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
  swimlaneCarousel: {width: '100%', height: 310},
  // Poster cell matches the source poster aspect ratio (480x720 = 0.667), so
  // width 200 -> height 300, letting 'cover' fill without cropping the number.
  poster: {width: 200, height: 300},
  posterImage: {width: '100%', height: '100%', resizeMode: 'cover'},
});
