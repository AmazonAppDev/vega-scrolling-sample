/*
 * V1 counterpart of the base app's CarouselCardRow (one horizontal row of cards),
 * built on the V1 Carousel (@amazon-devices/kepler-ui-components). Reuses the
 * app's CARD_VARIATIONS (Card), config, and data so it renders identically to
 * the V2 grid's rows, just on the V1 API.
 */
import React, {memo} from 'react';
import {View} from 'react-native';
import {
  Carousel,
  CarouselRenderInfo,
  ItemInfo,
} from '@amazon-devices/kepler-ui-components';
import {CardData, CardRowProps} from '../../types';
import {CARD_CONFIG} from '../../config/layout/cardConfig';
import {ROW_CONFIG} from '../../config';
import {CARD_VARIATIONS} from '../../components/CardVariations';
import {CardTitle} from '../../components/CardTitle';
import {ROW_DATA} from '../../data';

const cardViewFor = (cardType: CardData['cardType']) => {
  const Card = CARD_VARIATIONS[cardType];
  const CardView: React.FC<CarouselRenderInfo<CardData>> = ({item}) => (
    <Card data={item} scroll={{}} />
  );
  return CardView;
};

export const CarouselCardRowV1 = memo(({rowIndex}: CardRowProps) => {
  const row = ROW_DATA[rowIndex];
  const cards = row.data || [];
  const cardType = row.cardType;

  const CardView = cardViewFor(cardType);
  const itemDimensions: ItemInfo[] = [
    {
      view: CardView,
      dimension: {
        width: ROW_CONFIG[cardType].WIDTH,
        height: CARD_CONFIG[cardType].CARD.HEIGHT,
      },
    },
  ];

  return (
    <View style={{height: ROW_CONFIG[cardType].HEIGHT}}>
      <CardTitle cardType={cardType} title={row.title} />
      <Carousel
        data={cards}
        getItemForIndex={() => CardView}
        keyProvider={(_d: CardData, index: number) =>
          `${cardType}-card-${index}`
        }
        itemDimensions={itemDimensions}
        renderItem={(info: CarouselRenderInfo<CardData>) => (
          <CardView {...info} />
        )}
        testID={`v1-horizontal-carousel-row-${rowIndex}`}
        orientation="horizontal"
        maxToRenderPerBatch={8}
        numOffsetItems={2}
        itemPadding={20}
        itemScrollDelay={0.2}
        focusIndicatorType="pinned"
        pinnedFocusOffset="50%"
        selectionBorder={{
          enabled: true,
          borderRadius: CARD_CONFIG[cardType].CARD.BORDER_RADIUS,
          borderStrokeRadius: CARD_CONFIG[cardType].CARD.BORDER_RADIUS,
        }}
        selectionBorderStrategy="outset"
      />
    </View>
  );
});
