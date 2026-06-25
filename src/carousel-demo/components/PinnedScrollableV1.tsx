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
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Image, Pressable, View, Text} from 'react-native';
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
  <Pressable style={{width: 200, height: 230}}>
    <Image
      style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      source={item.url}
    />
  </Pressable>
);

const POSTER_DIMENSIONS: ItemInfo[] = [
  {view: PosterView, dimension: {width: 200, height: 230}},
];

const Swimlane = ({swimlane}: {swimlane: SwimlaneData}) => (
  <View
    style={{height: 275, width: '100%', borderWidth: 2, borderColor: 'lime'}}>
    <Text style={{color: 'white', marginLeft: 20, marginBottom: 5}}>
      pin='{swimlane.pinOffset}'
    </Text>
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
      containerStyle={{width: '100%', height: 240}}
      itemPadding={20}
      itemScrollDelay={0.2}
      focusIndicatorType="pinned"
      pinnedFocusOffset={swimlane.pinOffset}
      selectionBorder={{
        enabled: true,
        borderColor: '#00FF00',
        borderWidth: 3,
        borderRadius: 8,
      }}
    />
  </View>
);

const SwimlaneView: React.FC<CarouselRenderInfo<SwimlaneData>> = ({item}) => (
  <Swimlane swimlane={item} />
);

const ROW_DIMENSIONS: ItemInfo[] = [
  {view: SwimlaneView, dimension: {width: CONTENT_WIDTH, height: 275}},
];

export const PinnedScrollableV1 = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<string>>) => {
    const scrollableRef = useRef<CarouselRef<string>>(null);
    const swimlanes: SwimlaneData[] = PIN_OFFSETS.map((p) => ({
      pinOffset: p,
      items: data,
    }));

    useImperativeHandle(ref, () => scrollableRef.current!, []);

    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
        <Text style={{color: 'lime', padding: 5, fontSize: 14}}>
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
          containerStyle={{height: '100%', width: '100%'}}
          itemPadding={0}
          itemScrollDelay={0.4}
          focusIndicatorType="pinned"
          pinnedFocusOffset={'44%'}
        />
      </View>
    );
  },
);
