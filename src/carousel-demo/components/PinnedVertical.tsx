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
  useMemo,
  useRef,
} from 'react';
import {Image, Pressable, View, Text, StyleSheet} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
  CarouselItemStyleProps,
  AnimationDurationProps,
  SelectionBorderProps,
} from '@amazon-devices/vega-carousel';
import {Button} from '@amazon-devices/kepler-ui-components';
import {ItemType, ScrollableProps} from '../Types';

const INITIAL_START_INDEX = 5;
const PIN = '44%';
const SCROLL_TO_TARGETS = [0, 5, 15, 29];

// Module-scope handlers/objects: stable references across renders.
const getItemKey = (info: CarouselRenderInfo) => `${info.index}`;
const notifyDataError = () => false;

const renderPoster = ({item}: CarouselRenderInfo<ItemType>) => (
  <Pressable style={styles.poster}>
    <Image style={styles.posterImage} source={item.url} />
  </Pressable>
);

const ITEM_STYLE: CarouselItemStyleProps = {
  itemPadding: 20,
  itemPaddingOnSelection: 20,
  selectedItemScaleFactor: 1.0,
  pressedItemScaleFactor: 1.0,
};

const ANIMATION_DURATION: AnimationDurationProps = {itemScrollDuration: 0.2};

const SELECTION_BORDER: SelectionBorderProps = {
  borderStrategy: 'outset',
  borderColor: '#00FFFF',
  borderWidth: 3,
  borderRadius: 8,
};

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

    const dataAdapter = useMemo(
      () => ({getItem, getItemCount, getItemKey, notifyDataError}),
      [getItem, getItemCount],
    );

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Carousel
            ref={carouselRef}
            dataAdapter={dataAdapter}
            renderItem={renderPoster}
            testID="v2-pinned-vertical"
            uniqueId="v2-pinned-vertical"
            orientation={'vertical'}
            numOffsetItems={1}
            renderedItemsCount={10}
            initialStartIndex={INITIAL_START_INDEX}
            hasPreferredFocus={true}
            containerStyle={styles.carousel}
            itemStyle={ITEM_STYLE}
            animationDuration={ANIMATION_DURATION}
            selectionStrategy="pinned"
            pinnedSelectedItemOffset={PIN}
            selectionBorder={SELECTION_BORDER}
          />
          <View style={styles.controls}>
            <Text style={styles.title}>
              Vertical pinned {PIN} (V2) - initialStartIndex=
              {INITIAL_START_INDEX}
            </Text>
            <Text style={styles.scrollToLabel}>scrollTo:</Text>
            {SCROLL_TO_TARGETS.map((idx) => (
              <View key={idx} style={styles.button}>
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

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', backgroundColor: '#000'},
  row: {flex: 1, flexDirection: 'row'},
  carousel: {width: 200, height: '100%'},
  poster: {width: 200, height: 230},
  posterImage: {width: '100%', height: '100%', resizeMode: 'cover'},
  controls: {marginLeft: 40, justifyContent: 'center', flex: 1},
  title: {color: 'cyan', fontSize: 14, marginBottom: 20},
  scrollToLabel: {color: 'white', marginBottom: 10},
  button: {marginBottom: 10},
});
