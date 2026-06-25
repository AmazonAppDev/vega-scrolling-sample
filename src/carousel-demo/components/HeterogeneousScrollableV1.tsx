/*
 * Heterogeneous scrollable (V1 Carousel from @amazon-devices/kepler-ui-components).
 *
 * V1 counterpart of HeterogeneousScrollable.tsx: different item sizes in one row,
 * for side-by-side comparison. V1 uses itemDimensions to declare the two sizes,
 * and getItemForIndex to pick the view per index.
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

const ItemViewType1: React.FC<CarouselRenderInfo<ItemType>> = ({item}) => (
  <Pressable style={CAROUSEL_STYLE.itemContainerType1}>
    <Image style={CAROUSEL_STYLE.imageContainer} source={item.url} />
  </Pressable>
);

const ItemViewType2: React.FC<CarouselRenderInfo<ItemType>> = ({item}) => (
  <Pressable style={CAROUSEL_STYLE.itemContainerType2}>
    <Image
      style={CAROUSEL_STYLE.imageContainer}
      resizeMode="cover"
      source={item.url}
    />
  </Pressable>
);

const ITEM_DIMENSIONS: ItemInfo[] = [
  {
    view: ItemViewType1,
    dimension: {
      width: CAROUSEL_STYLE.itemContainerType1.width,
      height: CAROUSEL_STYLE.itemContainerType1.height,
    },
  },
  {
    view: ItemViewType2,
    dimension: {
      width: CAROUSEL_STYLE.itemContainerType2.width,
      height: CAROUSEL_STYLE.itemContainerType2.height,
    },
  },
];

export const HeterogeneousItemViewScrollableV1 = forwardRef(
  ({data}: ScrollableProps, ref?: Ref<CarouselRef<string>>) => {
    const scrollableRef = useRef<CarouselRef<string>>(null);
    useImperativeHandle(ref, () => scrollableRef.current!, []);

    return (
      <Carousel
        ref={scrollableRef}
        data={data}
        getItemForIndex={(index: number) =>
          index % 2 === 0 ? ItemViewType1 : ItemViewType2
        }
        keyProvider={(_d: ItemType, index: number) => `${index}`}
        itemDimensions={ITEM_DIMENSIONS}
        renderItem={(info: CarouselRenderInfo<ItemType>) =>
          info.index % 2 === 0 ? (
            <ItemViewType1 {...info} />
          ) : (
            <ItemViewType2 {...info} />
          )
        }
        testID="v1-heterogeneous-carousel"
        orientation={'horizontal'}
        numOffsetItems={2}
        maxToRenderPerBatch={12}
        hasTVPreferredFocus={true}
        containerStyle={CAROUSEL_STYLE.horizontalCarouselContainerStyle}
        itemPadding={40}
        itemScrollDelay={0.2}
        itemSelectionExpansion={{widthScale: 1.1, heightScale: 1.1}}
        focusIndicatorType="fixed"
        selectionBorder={{
          enabled: true,
          borderColor: 'white',
          borderWidth: 4,
          borderRadius: 8,
        }}
        selectionBorderStrategy="inset_fit"
      />
    );
  },
);
