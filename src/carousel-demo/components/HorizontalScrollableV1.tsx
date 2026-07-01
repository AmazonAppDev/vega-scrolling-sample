/*
 * Horizontal scrollable (V1 Carousel from @amazon-devices/kepler-ui-components).
 *
 * V1 counterpart of HorizontalScrollable.tsx, for side-by-side comparison.
 * V1 prop mapping vs V2 (vega-carousel):
 *   selectionStrategy="natural" -> focusIndicatorType="natural"
 *   hasPreferredFocus           -> hasTVPreferredFocus
 *   animationDuration           -> itemScrollDelay
 *   dataAdapter{...}            -> data[] + getItemForIndex + keyProvider + itemDimensions
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
  <Pressable style={CAROUSEL_STYLE.itemHorizontalContainer}>
    <Image style={CAROUSEL_STYLE.imageContainer} source={item.url} />
  </Pressable>
);

const POSTER_DIMENSIONS: ItemInfo[] = [
  {view: PosterView, dimension: {width: 250, height: 420}},
];

export const HorizontalScrollableV1 = forwardRef(
  (
    {data, focusIndicatorType = 'natural'}: ScrollableProps,
    ref?: Ref<CarouselRef<string>>,
  ) => {
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
        testID="v1-horizontal-carousel"
        orientation={'horizontal'}
        numOffsetItems={2}
        maxToRenderPerBatch={12}
        hasTVPreferredFocus={true}
        containerStyle={CAROUSEL_STYLE.horizontalCarouselContainerStyle}
        itemPadding={20}
        itemScrollDelay={0.2}
        itemSelectionExpansion={{widthScale: 1.1, heightScale: 1.1}}
        focusIndicatorType={focusIndicatorType}
        selectionBorder={{
          enabled: true,
          borderColor: 'white',
          borderWidth: 4,
          borderRadius: 8,
        }}
        selectionBorderStrategy="outset"
      />
    );
  },
);
