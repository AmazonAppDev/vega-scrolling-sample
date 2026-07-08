import {TextStyle} from 'react-native';
import {CardType, ImageResolutions} from '../../types';

type CardConfig = Record<
  CardType,
  {
    TITLE: {
      HEIGHT: number;
      FONT_SIZE: number;
      FONT_WEIGHT: TextStyle['fontWeight'];
    };
    CARD: {
      HEIGHT: number;
      WIDTH: number;
      BORDER_RADIUS: number;
      RESOLUTION: keyof typeof ImageResolutions;
      // Per-card horizontal gap, applied as marginRight on the card itself.
      // Kept at 0 for the V2 vega-carousel path, which controls spacing via
      // itemStyle.itemPadding / itemPaddingOnSelection instead. The FlashList
      // path has no such item padding, so it relies on this GAP for spacing —
      // change it here if you need gaps in the FlashList grid.
      GAP: number;
    };
    ROW_GAP: number;
  }
>;

export const CARD_CONFIG: CardConfig = {
  HERO: {
    TITLE: {
      HEIGHT: 30,
      FONT_SIZE: 25,
      FONT_WEIGHT: '700',
    },
    CARD: {
      HEIGHT: 200,
      WIDTH: 350,
      BORDER_RADIUS: 15,
      RESOLUTION: '720',
      GAP: 0,
    },
    ROW_GAP: 50,
  },
  VERTICAL: {
    TITLE: {
      HEIGHT: 25,
      FONT_SIZE: 18,
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: 200,
      WIDTH: 125,
      BORDER_RADIUS: 10,
      RESOLUTION: '260',
      GAP: 0,
    },
    ROW_GAP: 15,
  },
  REGULAR: {
    TITLE: {
      HEIGHT: 25,
      FONT_SIZE: 18,
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: 88,
      WIDTH: 150,
      BORDER_RADIUS: 8,
      RESOLUTION: '400',
      GAP: 0,
    },
    ROW_GAP: 15,
  },
};
