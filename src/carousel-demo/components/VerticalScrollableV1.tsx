/*
 * Vertical scrollable (V1 Carousel from @amazon-devices/kepler-ui-components).
 *
 * V1 counterpart of VerticalScrollable.tsx, for side-by-side comparison.
 * V1 prop mapping vs V2: selectionStrategy="anchored" -> focusIndicatorType="fixed";
 * hasPreferredFocus -> hasTVPreferredFocus; data adapter -> data[] + getItemForIndex
 * + keyProvider + itemDimensions.
 */
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Image, Pressable} from 'react-native';
import {
  Carousel,
  CarouselRef,
  CarouselRenderInfo,
  ItemInfo,
} from '@amazon-devices/kepler-ui-components';
import {ItemType, ScrollableProps} from '../Types';
import {CAROUSEL_STYLE} from './Style';

const PosterView: React.FC<CarouselRenderInfo<ItemType>> = ({item}) => (
  <Pressable style={CAROUSEL_STYLE.itemVerticalContainer}>
    <Image style={CAROUSEL_STYLE.imageContainer} source={item.url} />
  </Pressable>
);

const POSTER_DIMENSIONS: ItemInfo[] = [
  {view: PosterView, dimension: {width: 250, height: 420}},
];

export const VerticalScrollableV1 = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<string>>) => {
    const scrollableRef = useRef<CarouselRef<string>>(null);
    useImperativeHandle(ref, () => scrollableRef.current!, []);

    return (
      <Carousel
        ref={scrollableRef}
        data={data}
        getItemForIndex={() => PosterView}
        keyProvider={(_d: ItemType, index: number) => `${index}`}
        itemDimensions={POSTER_DIMENSIONS}
        renderItem={(info: CarouselRenderInfo<ItemType>) => (
          <PosterView {...info} />
        )}
        testID="v1-vertical-carousel"
        orientation={'vertical'}
        numOffsetItems={2}
        maxToRenderPerBatch={11}
        hasTVPreferredFocus={true}
        containerStyle={CAROUSEL_STYLE.verticalCarouselContainerStyle}
        itemPadding={10}
        itemScrollDelay={0.2}
        focusIndicatorType="fixed"
        selectionBorder={{
          enabled: true,
          borderColor: 'red',
          borderWidth: 5,
          borderRadius: 10,
        }}
        selectionBorderStrategy="outset"
      />
    );
  },
);
