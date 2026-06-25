/*
 * Pinned vertical (V2 vega-carousel).
 *
 * A single VERTICAL carousel with selectionStrategy="pinned" and a nonzero
 * initialStartIndex, plus scrollTo buttons. This isolates the vertical-list case:
 *   - DPad scroll pins the focused item at pinnedSelectedItemOffset (works).
 *   - initialStartIndex / scrollTo should land the target at the pin too, but
 *     they anchor at the edge instead.
 */
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Image, Pressable, View, Text} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
} from '@amazon-devices/vega-carousel';
import {Button} from '@amazon-devices/kepler-ui-components';
import {ItemType, ScrollableProps} from '../Types';

const INITIAL_START_INDEX = 5;
const PIN = '44%';

export const PinnedVertical = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<any>>) => {
    const carouselRef = useRef<CarouselRef<any>>(null);
    useImperativeHandle(ref, () => carouselRef.current!, []);

    const getItem = useCallback(
      (index: number) =>
        index >= 0 && index < data.length ? data[index] : undefined,
      [data],
    );
    const getItemCount = useCallback(() => data.length, [data]);

    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Carousel
            ref={carouselRef}
            dataAdapter={{
              getItem,
              getItemCount,
              getItemKey: (info: CarouselRenderInfo) => `${info.index}`,
              notifyDataError: () => false,
            }}
            renderItem={({item}: CarouselRenderInfo<ItemType>) => (
              <Pressable style={{width: 200, height: 230}}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={item.url}
                />
              </Pressable>
            )}
            testID="v2-pinned-vertical"
            uniqueId="v2-pinned-vertical"
            orientation={'vertical'}
            numOffsetItems={1}
            renderedItemsCount={10}
            initialStartIndex={INITIAL_START_INDEX}
            hasPreferredFocus={true}
            containerStyle={{width: 200, height: '100%'}}
            itemStyle={{
              itemPadding: 20,
              itemPaddingOnSelection: 20,
              selectedItemScaleFactor: 1.0,
              pressedItemScaleFactor: 1.0,
            }}
            animationDuration={{itemScrollDuration: 0.2}}
            selectionStrategy="pinned"
            pinnedSelectedItemOffset={PIN}
            selectionBorder={{
              borderColor: '#00FFFF',
              borderWidth: 3,
              borderRadius: 8,
            }}
          />
          <View style={{marginLeft: 40, justifyContent: 'center', flex: 1}}>
            <Text style={{color: 'cyan', fontSize: 14, marginBottom: 20}}>
              Vertical pinned 50% (V2) - initialStartIndex={INITIAL_START_INDEX}
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
