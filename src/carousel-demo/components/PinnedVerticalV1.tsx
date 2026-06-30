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
import {Image, Pressable, View, Text, StyleSheet} from 'react-native';
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
const SCROLL_TO_TARGETS = [0, 5, 15, 29];

const PosterView: React.FC<CarouselRenderInfo<ItemType>> = ({item}) => (
  <Pressable style={styles.poster}>
    <Image style={styles.posterImage} source={item.url} />
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
      <View style={styles.container}>
        <View style={styles.row}>
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
            containerStyle={styles.carousel}
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
            selectionBorderStrategy="outset"
          />
          <View style={styles.controls}>
            <Text style={styles.title}>
              Vertical pinned {PIN} (V1) - initialStartIndex=
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
