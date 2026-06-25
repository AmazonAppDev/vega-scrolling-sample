/*
 * Pinned vertical (V1 Carousel from @amazon-devices/kepler-ui-components).
 *
 * V1 counterpart of PinnedVertical.tsx for apple-to-apple comparison of the
 * vertical-list case. Same layout and scrollTo buttons, built on the V1 array
 * data model.
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
  Button,
} from '@amazon-devices/kepler-ui-components';
import {ItemType, ScrollableProps} from '../Types';

const INITIAL_START_INDEX = 5;
const PIN: `${number}%` = '44%';

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

export const PinnedVerticalV1 = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<string>>) => {
    const carouselRef = useRef<CarouselRef<string>>(null);
    useImperativeHandle(ref, () => carouselRef.current!, []);

    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Carousel
            ref={carouselRef}
            data={data}
            getItemForIndex={() => PosterView}
            keyProvider={(_d: ItemType, index: number) => `${index}`}
            itemDimensions={POSTER_DIMENSIONS}
            renderItem={(info: CarouselRenderInfo<ItemType>) => (
              <PosterView {...info} />
            )}
            testID="v1-pinned-vertical"
            orientation={'vertical'}
            numOffsetItems={1}
            maxToRenderPerBatch={10}
            initialStartIndex={INITIAL_START_INDEX}
            hasTVPreferredFocus={true}
            containerStyle={{width: 200, height: '100%'}}
            itemPadding={20}
            itemScrollDelay={0.2}
            focusIndicatorType="pinned"
            pinnedFocusOffset={PIN}
            selectionBorder={{
              enabled: true,
              borderColor: '#00FFFF',
              borderWidth: 3,
              borderRadius: 8,
            }}
          />
          <View style={{marginLeft: 40, justifyContent: 'center', flex: 1}}>
            <Text style={{color: 'cyan', fontSize: 14, marginBottom: 20}}>
              Vertical pinned 50% (V1) - initialStartIndex={INITIAL_START_INDEX}
            </Text>
            <Text style={{color: 'white', marginBottom: 10}}>scrollTo:</Text>
            {[0, 5, 15, 29].map((idx) => (
              <View key={idx} style={{marginBottom: 10}}>
                <Button
                  label={`→${idx}`}
                  onPress={() => carouselRef.current?.scrollTo(idx, true)}
                  variant={'primary'}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  },
);
