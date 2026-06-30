import React, {memo, useCallback} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {CardProps} from '../types';
import {CARD_CONFIG} from '../config/layout/cardConfig';
import {currentList} from '../config/listConfig';
import {DEFAULT_IMAGE_RESOLUTION} from '../constants';

const checkIfDataSame = (prevProps: CardProps, nextProps: CardProps) => {
  const dataSame =
    prevProps.cardType === nextProps.cardType &&
    prevProps.data.resolutions[DEFAULT_IMAGE_RESOLUTION] ===
      nextProps.data.resolutions[DEFAULT_IMAGE_RESOLUTION] &&
    prevProps.data.index === nextProps.data.index &&
    prevProps.data.rowIndex === nextProps.data.rowIndex;
  return dataSame;
};

export const Card = memo(
  ({cardType, data, scroll, setRefForFocusedCard, onFocus}: CardProps) => {
    const focusHandler = useCallback(() => {
      // Snapped focus for Flashlist
      if (currentList === 'FlashList') {
        scroll.vertically?.(data.rowIndex);
        scroll.horizontally?.(data.index);
      }

      onFocus?.(data);
    }, [data, scroll, onFocus]);
    const blurHandler = useCallback(() => {}, []);

    return (
      <Pressable
        ref={setRefForFocusedCard}
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
          // Fill the (already correctly sized) card box and preserve the
          // poster's aspect ratio. Without resizeMode the image is stretched to
          // the box dimensions, which distorts posters whose native ratio
          // differs from the card box (e.g. wide HERO/REGULAR vs tall VERTICAL).
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>
    );
  },
  checkIfDataSame,
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
