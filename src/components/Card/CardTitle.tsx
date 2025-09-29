import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardTitleProps} from '../../types'
import {CARD_CONFIG} from '../../config';

export const CardTitle = memo(
  ({cardType, title}: CardTitleProps) => {
    return (
      <View
        style={{
          height: CARD_CONFIG[cardType].TITLE.HEIGHT,
          marginTop: CARD_CONFIG[cardType].ROW_GAP,
        }}
        focusable={false}>
        <Text
          style={[
            styles.title,
            {
              fontSize: CARD_CONFIG[cardType].TITLE.FONT_SIZE,
              fontWeight: CARD_CONFIG[cardType].TITLE.FONT_WEIGHT,
            },
          ]}>
          {title}
        </Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  },
);

const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
});
