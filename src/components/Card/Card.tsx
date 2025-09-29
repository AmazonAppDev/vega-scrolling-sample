import React, {memo, useCallback} from 'react';
import {
  Animated,
  Image,
  InteractionManager,
  Pressable,
  StyleSheet,
  useAnimatedValue,
} from 'react-native';
import {CardProps} from '../../types';
import {CARD_CONFIG, currentList, FOCUS_BORDER} from '../../config';
import { isCardData, isValidCardType } from '../../utils';


const checkIfDataSame = (prevProps: CardProps, nextProps: CardProps) => {
  const dataSame =
    prevProps.cardType === nextProps.cardType &&
    prevProps.data.imageUrl ===
      nextProps.data.imageUrl &&
    prevProps.data.index === nextProps.data.index &&
    prevProps.data.rowIndex === nextProps.data.rowIndex;
  return dataSame;
};

const hasValidCardProps = (cardType, data) => {
  const validProps =
    isValidCardType(cardType) &&
    isCardData(data)
  
  return validProps;
}

export const Card = memo(
  ({cardType, data, scroll, setRefForFocusedCard, onFocus}: CardProps) => {
    if (!hasValidCardProps(cardType, data)) {
      console.log("Card received invalid props");
    }
    
    const animationValue = useAnimatedValue(0);

    const focusAnimation = useCallback(() => {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, [data.index, data.rowIndex]);
    const focusHandler = useCallback(() => {
      InteractionManager.runAfterInteractions(focusAnimation);

      // Snapped focus for Flashlist
      if (currentList === 'FlashList') {
        scroll.vertically?.(data.rowIndex);
        scroll.horizontally?.(data.index);
      }

      onFocus?.(data);
    }, [data.index, data.rowIndex, focusAnimation]);
    const blurAnimation = useCallback(() => {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, [data.index, data.rowIndex]);
    const blurHandler = useCallback(() => {
      InteractionManager.runAfterInteractions(blurAnimation);
    }, [data.index, data.rowIndex, blurAnimation]);

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
        {/* Animated Border for focusing */}
        <Animated.View
          style={[
            styles.focusBorder,
            {
              height: CARD_CONFIG[cardType].CARD.HEIGHT,
              width: CARD_CONFIG[cardType].CARD.WIDTH,
              borderRadius: CARD_CONFIG[cardType].CARD.BORDER_RADIUS,
              opacity: animationValue,
            },
          ]}
        />
        <Image
          source={{uri: data.imageUrl}}
          height={CARD_CONFIG[cardType].CARD.HEIGHT - FOCUS_BORDER * 2}
          width={CARD_CONFIG[cardType].CARD.WIDTH - FOCUS_BORDER * 2}
          style={{
            margin: FOCUS_BORDER,
            borderRadius: CARD_CONFIG[cardType].CARD.BORDER_RADIUS,
          }}
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
  focusBorder: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#de4788',
  },
});
