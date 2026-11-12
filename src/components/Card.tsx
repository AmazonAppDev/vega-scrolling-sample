import React, {memo, useCallback} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {CardData, CardProps, CardType} from '../types';
import {CARD_CONFIG} from '../config/layout/cardConfig';

// Compares the image URL the card renders, not a fixed resolution.
export const isSameCardData = (
  cardType: CardType,
  prev: CardData,
  next: CardData,
) => {
  const rendered = CARD_CONFIG[cardType].CARD.RESOLUTION;
  return (
    prev.resolutions[rendered] === next.resolutions[rendered] &&
    prev.index === next.index &&
    prev.rowIndex === next.rowIndex
  );
};

export const checkIfDataSame = (prevProps: CardProps, nextProps: CardProps) =>
  prevProps.cardType === nextProps.cardType &&
  isSameCardData(nextProps.cardType, prevProps.data, nextProps.data);

export const Card = memo(({cardType, data, onFocus}: CardProps) => {
  const focusHandler = useCallback(() => {
    onFocus?.(data);
  }, [data, onFocus]);
  const blurHandler = useCallback(() => {}, []);

  return (
    <Pressable
      onFocus={focusHandler}
      onBlur={blurHandler}
      style={[
        styles.container,
        {
          height: CARD_CONFIG[cardType].CARD.HEIGHT,
          width: CARD_CONFIG[cardType].CARD.WIDTH,
          borderRadius: CARD_CONFIG[cardType].CARD.BORDER_RADIUS,
          marginRight: CARD_CONFIG[cardType].CARD.GAP, // GAP between elements
        },
      ]}>
      <Image
        source={{
          uri: data.resolutions[CARD_CONFIG[cardType].CARD.RESOLUTION],
        }}
        // cover preserves the poster's aspect ratio instead of stretching it.
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}, checkIfDataSame);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
